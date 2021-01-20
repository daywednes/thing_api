import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";
import { GetCovidFilterDto } from "./dto/get-covid.dto";
import { CovidEntity } from "./covid.entity";
import { CovidService } from "./covid.service";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@ApiTags("covid")
@Controller("covid")
// @ApiBearerAuth()
// @UseGuards(AuthGuard())
export class CovidController {
  private logger = new Logger("CovidController");
  constructor(private covidService: CovidService) {}

  // @Get()

  // @ApiOperation({ summary: 'Get All Covid' })
  // getAllCovid(
  //   @Query(ValidationPipe) getCovidFilterDto: GetCovidFilterDto,
  //   @GetUser() user: User,
  // ): Promise<CovidEntity[]> {
  //   this.logger.verbose(
  //     `User ${user.username} retriveing all Covid with filter ${JSON.stringify(
  //       getCovidFilterDto,
  //     )}`,
  //   );
  //   return this.CovidService.getCovid(getCovidFilterDto, user);
  // }

  @Get("/:id")
  @ApiOperation({ summary: "Get Covid by Zipcode (local)" })
  getCovidByhubId(
    @Param("id", ParseIntPipe) zipcode: number
  ): Promise<CovidEntity[]> {
    return this.covidService.getCovidByZipcodeId(zipcode);
  }

  @Get("/getCovidByLocation/:location")
  @ApiOperation({ summary: "Get Covid data from rapidapi by isoCode" })
  async getCovidByLocation(@Param("location") location: string): Promise<any> {
    let result = await this.covidService.getCovidByLocation(location);
    return result;
  }
}
