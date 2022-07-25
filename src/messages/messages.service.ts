import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  // messagesRepo: MessagesRepository;

  // constructor(messagesRepo: MessagesRepository) {
  //   this.messagesRepo = messagesRepo;
  // }

  // Is the same that the previous block
  // TypeScript integrates sugar syntax to prevent overloading classes
  // Do not forget the `public` keyword
  constructor(public messagesRepo: MessagesRepository) {}

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  async findAll() {
    return this.messagesRepo.findAll();
  }

  async create(message: string) {
    return this.messagesRepo.create(message);
  }
}
