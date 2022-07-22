import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  async listMessages() {
    return [];
  }

  @Get('/:id')
  async getMessage() {
    return {};
  }

  @Post()
  async createMessage() {
    return;
  }
}
