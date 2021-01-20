import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { GetCovidFilterDto } from "./dto/get-covid.dto";
import { CovidEntity } from "./covid.entity";
import { CovidRepository } from "./covid.repository";
import * as config from "config";

@Injectable()
export class CovidService {
  constructor(
    @InjectRepository(CovidRepository)
    private covidRepository: CovidRepository
  ) {}

  getCovid(
    covidFilterDto: GetCovidFilterDto
  ): Promise<CovidEntity[]> {
    return this.covidRepository.getCovid(covidFilterDto);
  }

  async getCovidById(id: number, user: User): Promise<CovidEntity> {
    const found = await this.covidRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Available device with id: ${id} not found`);
    }
    return found;
  }

  async getCovidByZipcodeId(zipcode: number): Promise<CovidEntity[]> {
    return this.covidRepository.getCovidByZipcodeId(zipcode);
  }

  async getCovidByLocation(location: string): Promise<any> {
    const serverConfig = config.get("server");
    var unirest = require("unirest");

    var req = unirest(
      "GET",
      "https://coronavirus-smartable.p.rapidapi.com/stats/v1/" + location + "/"
    );

    req.headers({
      "x-rapidapi-key": serverConfig.rapidapikey,
      "x-rapidapi-host": "coronavirus-smartable.p.rapidapi.com",
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
}
