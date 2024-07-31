import { Module } from '@nestjs/common';
import { VisitorSchedulingService } from './visitor_scheduling.service';
import {  ScheduleModule } from '@nestjs/schedule';
import { UserModule } from 'src/user/user.module';
import { PassService } from 'src/pass/pass.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tblVisitor } from 'src/pass/entities/tblVisitor.entity';
import { tblVisitorVisitDate } from 'src/tvv-date/entities/tvv-date.entity';
import { TvvDateService } from 'src/tvv-date/tvv-date.service';
import { TvvDateModule } from 'src/tvv-date/tvv-date.module';
import { VisitDateSchedulingService } from './visitDate-scheduling.service';
import { LoginLogsSchedulingService } from './loginLogs-scheduling.service';
import { tblLoginReport } from 'src/login-logs/entities/login-log.entity';
import { LoginLogsModule } from 'src/login-logs/login-logs.module';
import { LoginLogsService } from 'src/login-logs/login-logs.service';
import { tblAppoinTmentGenerate } from 'src/visitor-appointment-generate/entities/visitor-appointment-generate.entity';
import { VisitorAppointmentGenerateModule } from 'src/visitor-appointment-generate/visitor-appointment-generate.module';
import { VisitorAppointmentGenerateService } from 'src/visitor-appointment-generate/visitor-appointment-generate.service';
import { AppointmentsSchedulingService } from './appointments-scheduling.service';



@Module({
  imports:[ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([tblVisitor]),
    TypeOrmModule.forFeature([tblVisitorVisitDate]),
    TypeOrmModule.forFeature([tblLoginReport]),
    TypeOrmModule.forFeature([tblAppoinTmentGenerate])
    ,UserModule,TvvDateModule,LoginLogsModule,VisitorAppointmentGenerateModule],
  providers: [VisitorSchedulingService,VisitDateSchedulingService,LoginLogsSchedulingService,
    AppointmentsSchedulingService,VisitorAppointmentGenerateService,
     PassService,TvvDateService,LoginLogsService],
})
export class TaskSchedulingModule {}
