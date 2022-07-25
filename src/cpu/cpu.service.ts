import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  // The powerService prop is private because it comes from another module
  constructor(private powerService: PowerService) {}

  compute(a: number, b: number): number {
    console.log(`Drawing 10 watts of power from PowerService`);
    this.powerService.supplyPower(10);

    return a + b;
  }
}
