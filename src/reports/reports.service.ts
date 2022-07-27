import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

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
    const report = await this.repo.findOne(id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }

    report.approved = approved;

    return this.repo.save(report);
  }

  async createEstimate({
    make,
    model,
    lng,
    lat,
    year,
    mileage,
  }: GetEstimateDto) {
    // Examples
    //      Most basic query builder, returns all Report table data
    //      return this.repo.createQueryBuilder().select('*').getRawMany();
    //
    //      Other basic query builder, returns all reports about Toyota
    //      return this.repo
    //        .createQueryBuilder()
    //        .select('*')
    //        .where('make = :make', { make: estimateDto.make })
    //        .getRawMany();
    //
    // The `where('make = :make', { make: estimateDto.make })` syntax is to prevent SQL injection attacks

    return (
      this.repo
        .createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('make = :make AND model = :model', { make })
        .andWhere('model = :model', { model })
        .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
        .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
        .andWhere('year - :year BETWEEN -3 AND 3', { year })
        .andWhere('approved IS TRUE')
        // Use the absolute value of the difference to get the order by closest mileage
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        // The `.orderBy(..)` method does not allow to add the mileage value without `setParameters(...)`
        .setParameters({ mileage })
        // Keep only the 3 top responses
        .limit(3)
        // We get the average from the three responses, only one answer should be returned
        .getRawOne()
    );
  }
}
