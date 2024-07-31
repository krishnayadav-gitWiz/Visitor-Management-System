import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {  tblUserDetails } from './entities/user.entity';
import { UserRepository } from './repo/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
//import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(tblUserDetails)
    private userRepository: Repository <tblUserDetails> ){}


             


              findOneByUsername (userName:string){
                return this.userRepository.findOne({where:{userName:userName}})
              }

              
              async updatePassword(userId:number , newPassword:string):Promise<tblUserDetails>{
                const user = await this.userRepository.findOne({where:{userId:userId}});
                if (!user) {
                  throw new NotFoundException('User not found');
                }
                user.password= newPassword;
                return this.userRepository.save(user)
              }
}
