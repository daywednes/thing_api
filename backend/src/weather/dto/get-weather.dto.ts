import { IsOptional } from 'class-validator';

export class GetWeatherFilterDto {
  @IsOptional()
  cityName: string;
  @IsOptional()
  cityLat: string;
  @IsOptional()
  cityLon: string;
  @IsOptional()
  country: string;
  @IsOptional()
  date: string;
}
