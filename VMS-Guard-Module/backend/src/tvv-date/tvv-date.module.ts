import { Module } from '@nestjs/common';
import { TvvDateService } from './tvv-date.service';
import { TvvDateController } from './tvv-date.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tblVisitorVisitDate } from './entities/tvv-date.entity';
import { tvvDateRepository } from './repo/tvv-date.repository';
import { PassModule } from '../visitor-Info/pass.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([tblVisitorVisitDate]),PassModule,UserModule],
  controllers: [TvvDateController],
  providers: [TvvDateService,tvvDateRepository],
  
})
export class TvvDateModule {}
