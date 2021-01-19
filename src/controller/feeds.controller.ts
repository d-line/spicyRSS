import { BadRequestError, Body, Controller, Delete, Get, Param, Post, Put } from 'routing-controllers';
import 'reflect-metadata';
import { Feed } from 'src/models/feed';
import FeedModel from '../../src/models/feed.model';

@Controller()
export class FeedsController {
  @Get('/feeds')
  getAll () {
    return FeedModel.find().then(
      feeds => {
        return feeds;
      }
    );
  }

  @Post('/feeds')
  addNew (@Body() feed: Feed) {
    if (feed.url.trim() === '') {
      throw new BadRequestError('Request should contain feed url');
    }
    const createdFeed = new FeedModel(feed);
    console.table(createdFeed);
    return createdFeed.save().then(savedFeed => {
      return savedFeed;
    });
  }

  @Put('/feeds/:id')
  updateFeed (@Param('id') id: number, @Body() feed: any) {
    return `UPDATE FEED ${id}`;
  }

  @Delete('/feeds/:id')
  deleteFeed (@Param('id') id: number) {
    return `DELETE FEED ${id}`;
  }
}
