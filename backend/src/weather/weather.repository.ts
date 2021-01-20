import { InternalServerErrorException, Logger } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { MongoRepository } from "typeorm";
import { User } from "../auth/user.entity";
import { GetWeatherFilterDto } from "./dto/get-weather.dto";
import { WeatherEntity } from "./weather.entity";

@EntityRepository(WeatherEntity)
export class WeatherRepository extends MongoRepository<WeatherEntity> {
  private logger = new Logger("WeatherRepository");
  async getWeather(
    weatherFilterDto: GetWeatherFilterDto
  ): Promise<WeatherEntity[]> {
    const query = this.createQueryBuilder("weather_entity");

    try {
      const weather = await query.getMany();
      return weather;
    } catch (err) {
      this.logger.error(
        `Failed to get Weather with dto ${JSON.stringify(weatherFilterDto)}`,
        err.stack
      );
      throw new InternalServerErrorException();
    }
  }

  async getWeatherByZipcodeId(zipCode: number): Promise<WeatherEntity[]> {
    const query = this.createQueryBuilder("weather_entity");
    query.where("weather_entity.zipCode = :zipCode", { zipCode: zipCode });

    try {
      const weather = await query.getMany();
      return weather;
    } catch (err) {
      this.logger.error(
        `Failed to get Weather for device ${zipCode}`,
        err.stack
      );
      throw new InternalServerErrorException();
    }
  }
}
