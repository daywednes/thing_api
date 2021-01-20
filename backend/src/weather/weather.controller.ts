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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetWeatherFilterDto } from './dto/get-weather.dto';
import { WeatherEntity } from './weather.entity';
import { WeatherService } from './weather.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('weather')
@Controller('weather')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class WeatherController {
  private logger = new Logger('WeatherController');
  constructor(private WeatherService: WeatherService) {}

  @Get()
  
  @ApiOperation({ summary: 'Get All Weather' })
  getAllWeather(
    @Query(ValidationPipe) getWeatherFilterDto: GetWeatherFilterDto,
    @GetUser() user: User,
  ): Promise<WeatherEntity[]> {
    this.logger.verbose(
      `User ${user.username} retriveing all Weather with filter ${JSON.stringify(
        getWeatherFilterDto,
      )}`,
    );
    return this.WeatherService.getWeather(getWeatherFilterDto, user);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Weather by Hub Id' })
  getWeatherByhubId(
    @Param('id', ParseIntPipe) id: string,
    @GetUser() user: User,
  ): Promise<WeatherEntity[]> {
    return this.WeatherService.getWeatherByhubId(id, user);
  }


  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Available Device' })
  deleteWeather(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.WeatherService.deleteWeather(id, user);
  }
}
