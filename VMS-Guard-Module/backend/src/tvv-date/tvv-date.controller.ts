import { Controller, Get, Param } from '@nestjs/common';
import { TvvDateService } from './tvv-date.service';

@Controller('visits')
export class TvvDateController {
  constructor(private readonly tvvDateService: TvvDateService) {}
  
  @Get('visiting-info')
async getAllVisitingInfo() {
  const visitingInfoRecords = await this.tvvDateService.getAllVisitingInfo();
  return visitingInfoRecords;
}

@Get('/barcodeNo/:barcode')
findByBarcode(@Param('barcode')barcode:number){
  return this.tvvDateService.findByBarcodeNo(barcode)
}
 }
