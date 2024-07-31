import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreatetvvDateDto } from './dto/create-tvv-date.dto';
import { UpdateTvvDateDto } from './dto/update-tvv-date.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { tblVisitorVisitDate } from './entities/tvv-date.entity';
import { tvvDateRepository } from './repo/tvv-date.repository';
import { PassService } from 'src/pass/pass.service';
import { PassRepository } from '../pass/repo/pass.repository';
import { tblVisitor } from '../pass/entities/tblVisitor.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guards';
import { UserService } from 'src/user/user.service';
@Injectable()
export class TvvDateService {
  
  constructor(
    @InjectRepository(tblVisitorVisitDate)
    private TvvDateRepository:tvvDateRepository,
    private passService:PassService,
    private  userService:UserService
   
    ){}

  async create(createTvvDateDto: CreatetvvDateDto, visitorId:number) {
    let visitingInfo = new tblVisitorVisitDate();
    //visitingInfo.Barcode=createTvvDateDto.Barcode;
    visitingInfo.Department=createTvvDateDto.Department;
    visitingInfo.AllowedGates=createTvvDateDto.AllowedGates;
    visitingInfo.validFor=createTvvDateDto.validFor;
    visitingInfo.toMeet=createTvvDateDto.toMeet;
    visitingInfo.purpose=createTvvDateDto.purpose;
    // visitingInfo.noOfItems=createTvvDateDto.noOfItems;
    visitingInfo.AuthobyWhome=createTvvDateDto.AuthobyWhome;
    visitingInfo.visitor=await this.passService.findUserById(visitorId);
  return this.TvvDateRepository.save(visitingInfo);

  }

  findAll() {
    return this.TvvDateRepository.find(
      {
        order:{
          vDate:'DESC'
        }
      }
    );
  }

  findAllVisits(visitorId:number){
    return this.TvvDateRepository.find({
      relations:['visitor'],
      where:{visitor:{Id:visitorId}}
    })

  }


async findVisitByIndexId(indexId: number) {
  try {
    const visits = await this.TvvDateRepository.find({
      relations: ['visitor'],
      where:{indexId:indexId}
    });

    if (!visits || visits.length === 0) {
      throw new Error(`No visit found for indexId: ${indexId}`);
    }

    return visits;
  } catch (error) {
    console.error('Error fetching visit by indexId:', error);
    throw error;
  }
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






async getAllVisitingInfo() {
  return this.TvvDateRepository.find({
    relations: ['visitor'],
    order:{
      vDate:"DESC"
    } // Load the associated visitor details
  });

}

async update(indexId: number, UserId: number): Promise<tblVisitorVisitDate> {
  const tvvupdate = await this.TvvDateRepository.findOne({ where: { indexId: indexId } });
  if (!tvvupdate) { throw new NotFoundException("Not Found") }
 
  tvvupdate.Access = false;
  tvvupdate.PasscancelledAt = new Date().toLocaleString();
  tvvupdate.PassCancelledBy = await this.userService.findById(UserId);
 
  return this.TvvDateRepository.save(tvvupdate);
 }
 
}

