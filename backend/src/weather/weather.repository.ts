import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm'; import { MongoRepository } from 'typeorm';
import { User } from '../auth/user.entity';
import { GetWeatherFilterDto } from './dto/get-weather.dto';
import { WeatherEntity } from './weather.entity';

@EntityRepository(WeatherEntity)
export class WeatherRepository extends MongoRepository<WeatherEntity> {
  private logger = new Logger('WeatherRepository');
  async getWeather(
    weatherFilterDto: GetWeatherFilterDto,
    user: User,
  ): Promise<WeatherEntity[]> {
    const query = this.createQueryBuilder('weather_entity');

    try {
      const weather = await query.getMany();
      return weather;
    } catch (err) {
      this.logger.error(
        `Failed to get Weather for user ${user.username
        } with dto ${JSON.stringify(weatherFilterDto)}`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getWeatherByhubId(
    hubId: string,
    user: User,
  ): Promise<WeatherEntity[]> {
    const query = this.createQueryBuilder('weather_entity');
    query.where('weather_entity.hubId = :hubId', { hubId: hubId });

    try {
      const weather = await query.getMany();
      return weather;
    } catch (err) {
      this.logger.error(
        `Failed to get Weather for device ${hubId}`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
