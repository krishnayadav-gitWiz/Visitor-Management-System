import { Injectable, NotFoundException } from '@nestjs/common';
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


    async create(requestData: any): Promise<string> {
      const user = new tblVisitor();
      user.vFirstName = requestData.vFirstName;
      user.vLastName = requestData.vLastName;
      user.vDateOfBirth = requestData.vDateOfBirth;
      user.vMobileNo = requestData.vMobileNo;
      user.vehicleNo = requestData.vehicleNo;
      user.visitorType = requestData.visitorType;
      user.vAddress = requestData.vAddress;
      user.vPhoto = requestData.vPhoto; // Assuming vPhoto is already a base64 string
      user.vSignature = requestData.vSignature; // Assuming vSignature is already a base64 string
  
      await this.passRepository.save(user);
  
      return 'User added successfully';
    }

    
    //findall visitors service 
    async getAllUsers(): Promise<tblVisitor[]> {
      return await this.passRepository.find({
        order:{
          vCommingDate:'DESC'
        }
      });
    }

    //find visitor by id 

    findUserById(Id:number){
      return this.passRepository.findOneOrFail({where:{Id:Id}})
    }

    async findById(Id: number): Promise<tblVisitor> {
      return this.passRepository.findOne({where:{Id:Id}});
    }
  //update user by id 

  async updateUserById(Id: number, updatePassDto: UpdatePassDto): Promise<void> {
    const user = await this.passRepository.findOne({where:{Id:Id}});

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update user properties using the DTO
    Object.assign(user, updatePassDto);

    await this.passRepository.save(user);
  }
  
}
