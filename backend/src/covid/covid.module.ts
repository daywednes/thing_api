import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CovidRepository } from './covid.repository';
import { CovidController } from './covid.controller';
import { CovidService } from './covid.service';

@Module({
  imports: [TypeOrmModule.forFeature([CovidRepository]), AuthModule],
  controllers: [CovidController],
  providers: [CovidService],
})
export class CovidModule {}
