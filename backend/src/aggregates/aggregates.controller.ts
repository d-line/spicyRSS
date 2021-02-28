import * as express from "express";
import Controller from "interfaces/controller.interface";
import authMiddleware from "../middleware/auth.middleware";
import storyModel from "../stories/stories.model";

class AggregatesController implements Controller {
  public path = "/aggregates";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes(): void {
    this.router.get(
      `${this.path}/stories`,
      authMiddleware,
      this.storiesPerFeed
    );
  }

  private storiesPerFeed = (
    request: express.Request,
    response: express.Response
  ) => {
    storyModel
      .aggregate([
        { $group: { _id: "$feed", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        {$lookup: {from: 'feeds', localField: '_id', foreignField: '_id', as: 'feed'}}
      ])
      .then((a) => {
        response.send(a);
      });
  };
}

export default AggregatesController;
