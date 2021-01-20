import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';
import { CovidModule } from './covid/covid.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    WeatherModule,
    CovidModule,
  ]
})
export class AppModule { }
