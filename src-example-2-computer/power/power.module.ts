import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  // By defaut, these services are private and cannot be used inside other modules
  providers: [PowerService],

  // Allow the use of the `PowerService` methods within other modules
  exports: [PowerService],
})
export class PowerModule {}
