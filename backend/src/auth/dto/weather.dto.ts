import { IsOptional, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WeatherDto {
  @IsOptional()
  @ApiProperty({
    description: 'Use this parameter when searching for a city',
    default: 'London,uk',
  })
  q: string;
  @IsOptional()
  @ApiProperty({
    description:
      'UGet current weather data when you know the latitude of the city.',
    default: '0',
  })
  lat: string;
  @IsOptional()
  @ApiProperty({
    description:
      ' Get current weather data when you know the longitude of the city.',
    default: '0',
  })
  lon: string;
  @IsOptional()
  @ApiProperty({
    description:
      'To use JavaScrip code you can transfer callback functionName to JSONP callback..',
    default: 'test',
  })
  callback: string;
  @IsOptional()
  @ApiProperty({
    description:
      'Get current weather data when you know the city ID. Not to be used with lon, lat, or q',
    default: '2172797',
  })
  id: string;
  @IsOptional()
  @ApiProperty({
    description: 'You can use different types of metric systems by units,....',
    default: 'null',
  })
  lang: string;
  @IsOptional()
  @ApiProperty({
    description: 'You can use different types of metric systems by units ',
    default: '"metric" or "imperial"',
  })
  units: string;
  @IsOptional()
  @ApiProperty({
    description: 'If left blank will default to JSON output',
    default: 'xml, html',
  })
  mode: string;
}
