import * as express from 'express';
import 'reflect-metadata';
import { Body, Delete, Get, JsonController, Param, Patch, Post, Res, UseAfter, UseBefore } from 'routing-controllers';
import FeedNotFoundException from '../middleware/FeedNotFoundException';
import { loggingAfter, loggingBefore } from '../middleware/middleware';
import { Feed, FeedUrl } from '../models/feed';
import feedModel from '../models/feed.model';
import rssFinder from 'rss-finder';
import Parser from 'rss-parser';

@UseBefore(loggingBefore)
@UseAfter(loggingAfter)
@JsonController()
export class FeedsController {
  @Get('/feeds')
  public getAllFeeds () {
    return feedModel.find().lean().exec().then((feeds) => {
      return feeds;
    });
  }

  @Get('/feeds/:id')
  public getFeedById (@Param('id') id: string) {
    return feedModel.findById(id).then((feed) => {
      if (feed) {
        return feed;
      } else {
        throw new FeedNotFoundException(id);
      }
    });
  }

  @Post('/feeds')
  public createFeed (@Body() feedUrl: FeedUrl) {
    console.table(feedUrl);
    return rssFinder(feedUrl).then((urls) => {
      console.table(urls);
      const feedUrl = urls.feedUrls[0].url;
      const parser = new Parser();
      return parser.parseURL(feedUrl).then((data) => {
        console.table(data);
        const newFeed: Feed = {
          name: data.title,
          url: data.feedUrl || feedUrl
        };
        return feedModel.create(newFeed).then((savedFeed) => {
          return savedFeed;
        });
      });
    });
  }

  @Patch('/feeds/:id')
  public modifyFeed (@Param('id') id: string, @Body() feed: Feed) {
    return feedModel.findByIdAndUpdate(id, feed, { new: true }).then((updatedFeed) => {
      if (updatedFeed) {
        return updatedFeed;
      } else {
        throw new FeedNotFoundException(id);
      }
    });
  }

  @Delete('/feeds/:id')
  public deleteFeed (@Param('id') id: string, @Res() response: express.Response) {
    return feedModel.findByIdAndDelete(id).then((res) => {
      if (res) {
        response.sendStatus(200);
      } else {
        throw new FeedNotFoundException(id);
      }
    });
  }
}
