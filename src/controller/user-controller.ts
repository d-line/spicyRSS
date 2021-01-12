import { Body, Controller, Get, OnUndefined, Param, Post } from 'routing-controllers';
import 'reflect-metadata';
import { Info } from '../models/info';

@Controller()
export class UserController {
  @Get('/users/:id')
  getOne (@Param('id') id: number) {
    return `This action returns user #${id}`;
  }

  @Post('/users')
  @OnUndefined(204)
  postOne (@Body() info: Info) {
    console.log(JSON.stringify(info));
  }
}
