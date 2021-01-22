import * as express from "express";
import FeedNotFoundException from '../middleware/FeedNotFoundException';
import { Feed } from '../models/feed';
import feedModel from '../models/feed.model';
import Controller from './controller.interface';

class FeedsController implements Controller {
  public path = '/feeds';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllFeeds);
    this.router.get(`${this.path}/:id`, this.getFeedById);
    this.router.post(this.path, this.createFeed);
    this.router.patch(`${this.path}/:id`, this.modifyFeed);
    this.router.delete(`${this.path}/:id`, this.deleteFeed);
  }

  private getAllFeeds (request: express.Request, response: express.Response) {
    feedModel.find().exec().then(feeds => {
      response.send(feeds);
    });
  }

  private getFeedById(request: express.Request, response: express.Response, next: express.NextFunction) {
    const id = request.params.id
    feedModel.findById(id).then(feed => {
      if (feed) {
        response.send(feed);
      } else {
        next(new FeedNotFoundException(id));
      }
    });
  }

  private createFeed (request: express.Request, response: express.Response) {
    const feed: Feed = request.body;
    const createdFeed = new feedModel(feed);
    createdFeed.save().then(savedFeed => {
      response.send(savedFeed);
    });
  }

  private modifyFeed (request: express.Request, response: express.Response, next: express.NextFunction) {
    const id = request.params.id
    const feed: Feed = request.body;
    feedModel.findByIdAndUpdate(id, feed, {new: true}).then(updatedFeed => {
      if (updatedFeed) {
        response.send(updatedFeed);
      } else {
        next(new FeedNotFoundException(id));
      }
    });
  }

  private deleteFeed (request: express.Request, response: express.Response, next: express.NextFunction) {
    const id = request.params.id
    feedModel.findByIdAndDelete(id).then(res => {
      if (res) {
        response.sendStatus(200);
      } else {
        next(new FeedNotFoundException(id));
      }
    });
  }
}

export default FeedsController;