import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  mileage: number;

  // Do not expose the whole user entity to prevent leaking sensitive properties like passwords, etc...
  // Transform data to only return its user.id
  // Still allow to get user data if required
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
