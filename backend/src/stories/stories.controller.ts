import Controller from "interfaces/controller.interface";
import * as express from "express";
import authMiddleware from "../middleware/auth.middleware";
import storyModel from "./stories.model";
import feedModel from "../feeds/feeds.model";
import FeedNotFoundException from "../exceptions/FeedNotFoundException";
import { Story } from "./story.interface";
import StoryNotFoundException from "../exceptions/StoryNotFoundException";

const PER_PAGE = 10;

class StoriesController implements Controller {
  public path = "/stories";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes(): void {
    this.router.get("/news", authMiddleware, this.getUnread);
    this.router.get("/feed/:id", authMiddleware, this.getStoriesForFeed);
    this.router.get("/archive", authMiddleware, this.getRead);
    this.router.get("/starred", authMiddleware, this.getStarred);
    this.router.put(`${this.path}/:id`, authMiddleware, this.modifyStory);
  }

  private getUnread = (
    request: express.Request,
    response: express.Response
  ) => {
    const page = parseInt(request.query.page as string, 10) || 1;
    storyModel
      .find({ isRead: false }, [], { sort: "-published" })
      .skip(PER_PAGE * page - PER_PAGE)
      .limit(PER_PAGE)
      .populate("feed")
      .then((stories) => {
        response.send(stories);
      });
  };

  private getStoriesForFeed = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    feedModel.findById(id).then((feed) => {
      if (feed) {
        storyModel
          .find({ feed }, [], { sort: "-published" })
          .populate("feed")
          .then((stories) => {
            response.send(stories);
          });
      } else {
        next(new FeedNotFoundException(id));
      }
    });
  };

  private getRead = (
    request: express.Request,
    response: express.Response
  ) => {
    storyModel
      .find({ isRead: true }, [], { sort: "-published" })
      .populate("feed")
      .then((stories) => {
        response.send(stories);
      });
  };

  private getStarred = (
    request: express.Request,
    response: express.Response
  ) => {
    storyModel
      .find({ isStarred: true }, [], { sort: "-published" })
      .populate("feed")
      .then((stories) => {
        response.send(stories);
      });
  };

  private modifyStory = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const storyData: Story = request.body;

    storyModel.findByIdAndUpdate(id, storyData, { new: true }).then((story) => {
      if (story) {
        response.send(story);
      } else {
        next(new StoryNotFoundException(id));
      }
    });

  };

}

export default StoriesController;
