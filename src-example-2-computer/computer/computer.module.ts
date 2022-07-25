import { Module } from '@nestjs/common';
import { ComputerController } from './computer.controller';
import { DiskModule } from '../disk/disk.module';
import { CpuModule } from '../cpu/cpu.module';

@Module({
  // We do not need to import the PowerService used by both CpuService and DiskService
  imports: [CpuModule, DiskModule],

  controllers: [ComputerController],
})
export class ComputerModule {}
