import { Controller, Get } from 'routing-controllers';

@Controller()
export class StoriesController {
  @Get('/news')
  getUnread () {
    return 'GET ALL UNREAD STORIES';
  }
}
