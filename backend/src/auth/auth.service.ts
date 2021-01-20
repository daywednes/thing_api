import {
  Injectable,
  Logger,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { WeatherDto } from './dto/weather.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async getOpenWeather(weatherDto: WeatherDto): Promise<any> {
    var unirest = require('unirest');

    var req = unirest(
      'GET',
      'https://community-open-weather-map.p.rapidapi.com/weather',
    );

    req.query({
      q: weatherDto.q ?  weatherDto.q: 'London,uk',
      lat: weatherDto.lat ?  weatherDto.lat: '0',
      lon: weatherDto.lon ?  weatherDto.lon: '0',
      callback: weatherDto.callback ?  weatherDto.callback: 'test',
      id: weatherDto.id ?  weatherDto.id: '2172797',
      lang: weatherDto.lang ?  weatherDto.lang: 'null',
      units: weatherDto.units ?  weatherDto.units: '"metric" or "imperial"',
      mode: weatherDto.mode ?  weatherDto.mode: 'xml, html',
    });

    req.headers({
      'x-rapidapi-key': '646c91d8fdmshf140e18f8eec60ep193bfejsna584cd4dfee2',
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      useQueryString: true,
    });

    return new Promise(resolve => {
      req.end(function(res) {
        if (res.error) {
          throw new NotFoundException(res.error);
        }
        console.log(res.body)
        resolve(res.body);
      });
    });
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return { accessToken };
  }
}
