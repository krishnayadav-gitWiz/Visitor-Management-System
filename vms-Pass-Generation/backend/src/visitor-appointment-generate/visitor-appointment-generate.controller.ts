import { Controller,ValidationPipe, Get,Query, Post, Body, Req,Patch, Param, Delete } from '@nestjs/common';
import { VisitorAppointmentGenerateService } from './visitor-appointment-generate.service';
import { CreateVisitorAppointmentGenerateDto } from './dto/create-visitor-appointment-generate.dto';


@Controller('vag')
export class VisitorAppointmentGenerateController {
  constructor(private readonly visitorAppointmentGenerateService: VisitorAppointmentGenerateService) {}

  @Post('/createAppointment')
  create(@Body(ValidationPipe) createVisitorAppointmentGenerateDto: CreateVisitorAppointmentGenerateDto) {
    return this.visitorAppointmentGenerateService.create(createVisitorAppointmentGenerateDto);
  }

  @Get('/findAll')
  findAll() {
    return this.visitorAppointmentGenerateService.findAll();
  }
}

