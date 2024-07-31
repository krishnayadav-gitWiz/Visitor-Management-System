import { Injectable } from '@nestjs/common';
import { CreatetblVisitorDto } from './dto/create-tblVisitor.dto';
import { UpdatePassDto } from './dto/update-pass.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { tblVisitor } from './entities/tblVisitor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PassService {
  constructor(
    @InjectRepository(tblVisitor)
    private passRepository:Repository<tblVisitor> ){}

    
    //findall visitors service 
    async getAllUsers(): Promise<tblVisitor[]> {
      return await this.passRepository.find({
        order:{
          vCommingDate:'DESC'
        }
      });
    }


  
}
