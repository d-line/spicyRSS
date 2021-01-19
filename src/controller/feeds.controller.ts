import { Body, Controller, Delete, Get, Param, Post, Put } from 'routing-controllers';
import 'reflect-metadata';

@Controller()
export class FeedsController {
  @Get('/feeds')
  getAll () {
    return 'GET ALL FEEDS';
  }

  @Post('/feeds')
  addNew (@Body() feed: any) {
    return `ADD NEW FEED ${JSON.stringify(feed)}`;
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
