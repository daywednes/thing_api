import { InternalServerErrorException, Logger } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { MongoRepository } from "typeorm";
import { User } from "../auth/user.entity";
import { GetCovidFilterDto } from "./dto/get-covid.dto";
import { CovidEntity } from "./covid.entity";

@EntityRepository(CovidEntity)
export class CovidRepository extends MongoRepository<CovidEntity> {
  private logger = new Logger("CovidRepository");
  async getCovid(
    covidFilterDto: GetCovidFilterDto
  ): Promise<CovidEntity[]> {
    const query = this.createQueryBuilder("covid_entity");

    try {
      const covid = await query.getMany();
      return covid;
    } catch (err) {
      this.logger.error(
        `Failed to get Covid for with dto ${JSON.stringify(covidFilterDto)}`,
        err.stack
      );
      throw new InternalServerErrorException();
    }
  }

  async getCovidByZipcodeId(zipCode: number): Promise<CovidEntity[]> {
    const query = this.createQueryBuilder("covid_entity");
    query.where("covid_entity.zipCode = :zipCode", { zipCode: zipCode });

    try {
      const covid = await query.getMany();
      return covid;
    } catch (err) {
      this.logger.error(
        `Failed to get Covid for device ${zipCode}`,
        err.stack
      );
      throw new InternalServerErrorException();
    }
  }
}
