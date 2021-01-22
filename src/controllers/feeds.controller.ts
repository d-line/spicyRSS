import * as express from "express";
import { Feed } from '../models/feed';

class FeedsController {
  public path = '/feeds';
  public router = express.Router();

  private feeds: Feed[] = [
    {
      name: '/r/algorithms',
      url: 'https://www.reddit.com/r/algorithms/new/.rss',
      status: 0,
      lastFetched: new Date('1/21/21, 4:24 PM'),
      createdAt: new Date('1/8/21, 9:53 AM'),
      updatedAt: new Date('1/21/21, 5:50 PM')
    }
  ];

  constructor() {
    this.initializeRoutes();
  }

  getAllFeeds = (request: express.Request, response: express.Response) => {
    response.send(this.feeds);
  }

  createFeed = (request: express.Request, response: express.Response) => {
    const feed: Feed = request.body;
    this.feeds.push(feed);
    response.send(feed);
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllFeeds);
    this.router.post(this.path, this.createFeed);
  }
}

export default FeedsController;