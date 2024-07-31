import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tblVisitorVisitDate } from './entities/tvv-date.entity';
import { tvvDateRepository } from './repo/tvv-date.repository';

@Injectable()
export class TvvDateService {
  
  constructor(
    @InjectRepository(tblVisitorVisitDate)
    private TvvDateRepository:tvvDateRepository,
    ){}
    
async getAllVisitingInfo() {
  return this.TvvDateRepository.find({
    relations: ['visitor'],
    order:{
      vDate:"DESC"
    } // Load the associated visitor details
  });

}
async findByBarcodeNo (barcode:number){
  try {
    const visits = await this.TvvDateRepository.find({
      relations: ['visitor'],
      where:{Barcode:barcode}
    });

    if (!visits || visits.length === 0) {
      throw new Error(`No visit found for indexId: ${barcode}`);
    }

    return visits;
  } catch (error) {
    console.error('Error fetching visit by indexId:', error);
    throw error;
  }
}
 
}

