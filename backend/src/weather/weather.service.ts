import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { GetWeatherFilterDto } from "./dto/get-weather.dto";
import { WeatherEntity } from "./weather.entity";
import { WeatherRepository } from "./weather.repository";
import { WeatherDto } from './dto/weather.dto';
import * as config from "config";

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherRepository)
    private weatherRepository: WeatherRepository
  ) {}

  getWeather(
    weatherFilterDto: GetWeatherFilterDto
  ): Promise<WeatherEntity[]> {
    return this.weatherRepository.getWeather(weatherFilterDto);
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

  async getWeatherByZipcodeId(zipcode: number): Promise<WeatherEntity[]> {
    return this.weatherRepository.getWeatherByZipcodeId(zipcode);
  }

  async getOpenWeatherByZipCode(zipcode: number): Promise<any> {
    const serverConfig = config.get("server");
    var unirest = require("unirest");

    var req = unirest(
      "GET",
      "https://community-open-weather-map.p.rapidapi.com/forecast"
    );

    req.query({
      q: zipcode,
    });

    req.headers({
      "x-rapidapi-key": serverConfig.rapidapikey,
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      useQueryString: true,
    });

    return new Promise((resolve) => {
      try {
        req.end(function(res) {
          if (res.error) {
            resolve(res.error);
          } else {
            resolve(res.body);
          }
        });
      } catch (error) {
        resolve(error);
      }
    });
  }

  
  async getOpenWeather(weatherDto: WeatherDto): Promise<any> {
    const serverConfig = config.get('server');
    var unirest = require('unirest');

    var req = unirest(
      'GET',
      'https://community-open-weather-map.p.rapidapi.com/weather',
    );

    req.query({
      q: weatherDto.q ? weatherDto.q : 'London,uk',
      lat: weatherDto.lat ? weatherDto.lat : '0',
      lon: weatherDto.lon ? weatherDto.lon : '0',
      callback: weatherDto.callback ? weatherDto.callback : 'test',
      id: weatherDto.id ? weatherDto.id : '2172797',
      lang: weatherDto.lang ? weatherDto.lang : 'null',
      units: weatherDto.units ? weatherDto.units : '"metric" or "imperial"',
      mode: weatherDto.mode ? weatherDto.mode : 'xml, html',
    });

    req.headers({
      'x-rapidapi-key': serverConfig.rapidapikey,
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      useQueryString: true,
    });

    return new Promise(resolve => {
      try {
        req.end(function (res) {
          if (res.error) {
            resolve(res.error);
          } else {
            resolve(res.body);
          }
        });
      } catch (error) {
        resolve(error);
      }
    });
  }
}
