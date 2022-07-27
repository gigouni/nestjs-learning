import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  // @InjectRepository(Report) is necessary because we'reusing a generic Report type with the Repository one
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User): Promise<Report> {
    // The `create(...) method creates the Report entity instance but doesn't persist it
    // It allows a prevalidation of the data based on decorators within the `report.entity.ts` file
    const createdReport = this.repo.create(reportDto);

    // ! IMPORTANT !
    // We add the whole user entity instance and TypeORM will only keep the ID in the Reports table
    createdReport.user = user;

    return this.repo.save(createdReport);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOneBy({ id });
    if (!report) {
      throw new NotFoundException('Report not found');
    }

    report.approved = approved;

    return this.repo.save(report);
  }
}
