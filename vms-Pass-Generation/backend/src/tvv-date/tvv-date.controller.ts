import { Controller, Get, Post,Req, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TvvDateService } from './tvv-date.service';
import { CreatetvvDateDto } from './dto/create-tvv-date.dto';
import { UpdatePassCancelDetailDto } from 'src/pass-cancel-details/dto/update-pass-cancel-detail.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('visits')
export class TvvDateController {
  constructor(private readonly tvvDateService: TvvDateService) {}

  @Post(':Id')
  create(@Body() createTvvDateDto:CreatetvvDateDto, @Param('Id') visitorId:number) {
    return this.tvvDateService.create(createTvvDateDto,Number(visitorId));
  }

  @Get('findAllVisits')
  findAll() {
    return this.tvvDateService.findAll();
  }
  
  @Get('/oneVisit/:indexId')
  findVisitByIndexId(@Param('indexId') indexId: number) {
    return this.tvvDateService.findVisitByIndexId(indexId);
  }
//Find visit by barcode

@Get('/barcodeNo/:barcode')
findByBarcode(@Param('barcode')barcode:number){
  return this.tvvDateService.findByBarcodeNo(barcode)
}
  



  //find all visits by Id
  @Get('findAllvisits/:visitorId')
  findAllVisits(@Param('visitorId') visitorId:Number){
    return this.tvvDateService.findAllVisits(Number(visitorId));
  }

  @Get('visiting-info')
async getAllVisitingInfo() {
  const visitingInfoRecords = await this.tvvDateService.getAllVisitingInfo();
  return visitingInfoRecords;
}

@Patch('/:indexId/:UserId')
update(@Param('indexId') indexId: number, @Param('UserId') UserId: number) {
 return this.tvvDateService.update(indexId, UserId);
}
 }
