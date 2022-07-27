import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
  // @InjectRepository(Report) is necessary because we'reusing a generic Report type with the Repository one
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto): Promise<Report> {
    // The `create(...) method creates the Report entity instance but doesn't persist it
    // It allows a prevalidation of the data based on decorators within the `report.entity.ts` file
    const createdReport = this.repo.create(reportDto);
    return this.repo.save(createdReport);
  }
}
