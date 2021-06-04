import * as express from "express";
import { Feed, NewFeed, FeedUrl } from "./feed.interface";
import feedModel from "./feeds.model";
import * as rssFinder from "rss-finder";
import * as Parser from "rss-parser";
import Controller from "../interfaces/controller.interface";
import FeedNotFoundException from "../exceptions/FeedNotFoundException";
import { CreateFeedDto, FeedDto } from "./feed.dto";
import validationMiddleware from "../middleware/validation.middleware";
import authMiddleware from "../middleware/auth.middleware";
import FeedAlreadyExistsException from "../exceptions/FeedAlreadyExistsException";

class FeedsController implements Controller {
  public path = "/feeds";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes(): void {
    this.router.get(this.path, authMiddleware, this.getAllFeeds);
    this.router.get(`${this.path}/:id`, authMiddleware, this.getFeed);
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(CreateFeedDto),
      this.createFeed
    );
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(FeedDto, true),
      this.modifyFeed
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteFeed);
  }

  private getAllFeeds = (
    request: express.Request,
    response: express.Response
  ) => {
    feedModel.find().sort({name: 1}).then((feeds) => {
      response.send(feeds);
    });
  };

  private getFeed = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    feedModel.findById(id).then((feed) => {
      if (feed) {
        response.send(feed);
      } else {
        next(new FeedNotFoundException(id));
      }
    });
  };

  private createFeed = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const url: FeedUrl = request.body;
    rssFinder(url)
      .then((res) => {
        console.table(res);
        const feedUrl = res.feedUrls[0].url;
        const parser = new Parser();
        parser
          .parseURL(feedUrl)
          .then((res) => {
            console.table(res);
            const newFeed: NewFeed = {
              name: res.title,
              url: res.feedUrl || feedUrl,
            };
            const createFeed = new feedModel(newFeed);
            createFeed
              .save()
              .then((savedFeed) => {
                response.send(savedFeed);
              })
              .catch(() => {
                next(new FeedAlreadyExistsException(url.url))
              });
          })
          .catch((err) => {
            console.error(`rssParser => ${err}`);
          });
      })
      .catch((err) => {
        console.error(`rssFinder error => ${err}`);
      });
  };

  private modifyFeed = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const feedData: Feed = request.body;
    feedModel.findByIdAndUpdate(id, feedData, { new: true }).then((feed) => {
      if (feed) {
        response.send(feed);
      } else {
        next(new FeedNotFoundException(id));
      }
    });
  };

  private deleteFeed = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    feedModel.findByIdAndDelete(id).then((successResponse) => {
      if (successResponse) {
        response.sendStatus(200);
      } else {
        next(new FeedNotFoundException(id));
      }
    });
  };
}

export default FeedsController;
