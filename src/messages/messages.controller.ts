import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDTO } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  @Get()
  async listMessages() {
    return [];
  }

  @Post()
  async createMessage(@Body() body: CreateMessageDTO) {
    console.log(body);
    return;
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    console.log(id);
    return {};
  }
}
