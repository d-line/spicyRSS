import { Action, Controller, Get, Param, UseAfter, UseBefore, UseInterceptor } from 'routing-controllers';
import 'reflect-metadata';
import { loggingAfter, loggingBefore } from '../middleware/middleware';

@Controller()
@UseBefore(loggingBefore)
@UseAfter(loggingAfter)
@UseInterceptor(function (action: Action, content: any) {
  console.log('change response...');
  content = `[${content}]`;
  return content;
})
export class UserController {
  @Get('/users/:id')
  getOne (@Param('id') id: number) {
    return `This action returns user #${id}`;
  }
}
