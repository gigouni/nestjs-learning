import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from '../power/power.module';

@Module({
  // The `CPUModule` now has access to the `PowerModule` methods
  imports: [PowerModule],

  providers: [CpuService],
  exports: [CpuService],
})
export class CpuModule {}
