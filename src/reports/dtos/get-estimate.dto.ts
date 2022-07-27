import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  // By default, the year prop received from the QueryString is... a string
  // So the class-validator will trigger validation errors
  // We need to transform its type to perform property validation on incoming request
  // Here we're only receiving the year prop, so we can destructure it to get its value
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  // By default, the lng prop received from the QueryString is... a string
  // Same transformation that the `year` property above
  // use `parseFloat(..)` because longitude could be with decimals
  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;

  // By default, the lat prop received from the QueryString is... a string
  // Same transformation that the `year` property above
  // use `parseFloat(..)` because latitude could be with decimals
  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;

  // By default, the mileage prop received from the QueryString is... a string
  // Same transformation that the `year` property above
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
