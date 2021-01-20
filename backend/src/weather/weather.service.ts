import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { GetWeatherFilterDto } from './dto/get-weather.dto';
import { WeatherEntity } from './weather.entity';
import { WeatherRepository } from './weather.repository';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherRepository)
    private weatherRepository: WeatherRepository
  ) { }

  getWeather(weatherFilterDto: GetWeatherFilterDto, user: User): Promise<WeatherEntity[]> {
    return this.weatherRepository.getWeather(weatherFilterDto, user);
  }

  async getWeatherById(id: number, user: User): Promise<WeatherEntity> {
    const found = await this.weatherRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Available device with id: ${id} not found`);
    }
    return found;
  }


  async getWeatherByhubId(hubId: string, user: User): Promise<WeatherEntity[]> {
    return this.weatherRepository.getWeatherByhubId(hubId, user);

  }

  async deleteWeather(id: number, user: User) {
    const result = await this.weatherRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Available device  with id: ${id} not found`);
    }
  }

}
