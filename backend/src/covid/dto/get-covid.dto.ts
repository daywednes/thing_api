import { IsOptional } from 'class-validator';

export class GetCovidFilterDto {
  @IsOptional()
  isoCode: string;
  @IsOptional()
  cityLat: string;
  @IsOptional()
  cityLon: string;
  @IsOptional()
  countryOrRegion: string;
}
