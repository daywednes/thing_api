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
// import { GetWeatherFilterDto } from './dto/get-weather.dto';
import { WeatherDto } from "./dto/weather.dto";
import { WeatherEntity } from "./weather.entity";
import { WeatherService } from "./weather.service";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@ApiTags("weather")
@Controller("weather")
// @ApiBearerAuth()
// @UseGuards(AuthGuard())
export class WeatherController {
  private logger = new Logger("WeatherController");
  constructor(private weatherService: WeatherService) {}

  // @Get()

  // @ApiOperation({ summary: 'Get All Weather' })
  // getAllWeather(
  //   @Query(ValidationPipe) getWeatherFilterDto: GetWeatherFilterDto,
  //   @GetUser() user: User,
  // ): Promise<WeatherEntity[]> {
  //   this.logger.verbose(
  //     `User ${user.username} retriveing all Weather with filter ${JSON.stringify(
  //       getWeatherFilterDto,
  //     )}`,
  //   );
  //   return this.WeatherService.getWeather(getWeatherFilterDto);
  // }

  @Get("/:id")
  @ApiOperation({ summary: "Get Weather by Zipcode (local)" })
  getWeatherByhubId(
    @Param("id", ParseIntPipe) zipcode: number
  ): Promise<WeatherEntity[]> {
    return this.weatherService.getWeatherByZipcodeId(zipcode);
  }

  @Get("/getOpenWeatherByZipCode/:zipCode")
  @ApiOperation({ summary: "Get Weather from rapidapi by zip code" })
  async getOpenWeatherByZipCode(
    @Param("zipCode") zipCode: number
  ): Promise<any> {
    let result = await this.weatherService.getOpenWeatherByZipCode(zipCode);
    return result;
  }

  @Post("/getOpenWeather")
  @ApiOperation({ summary: "Get current Weather by q condition" })
  async getOpenWeather(
    @Body(ValidationPipe) weatherDto: WeatherDto
  ): Promise<any> {
    let result = await this.weatherService.getOpenWeather(weatherDto);
    return result;
  }
}
