import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { WeatherRepository } from './weather.repository';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherRepository]), AuthModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
