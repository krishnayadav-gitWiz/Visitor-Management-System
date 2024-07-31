import { Module } from '@nestjs/common';
import { VisitorAppointmentGenerateService } from './visitor-appointment-generate.service';
import { VisitorAppointmentGenerateController } from './visitor-appointment-generate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tblAppoinTmentGenerate } from './entities/visitor-appointment-generate.entity';
import { AppointmentRepository } from './repo/appointment.repository';
import { LoginLogsModule } from 'src/login-logs/login-logs.module';

@Module({
  imports : [TypeOrmModule.forFeature([tblAppoinTmentGenerate]),
LoginLogsModule],
  controllers: [VisitorAppointmentGenerateController],
  providers: [VisitorAppointmentGenerateService,AppointmentRepository]
})
export class VisitorAppointmentGenerateModule {}
