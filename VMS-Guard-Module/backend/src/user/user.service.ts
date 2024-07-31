import { Injectable } from '@nestjs/common';
import {  tblUserDetails } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(tblUserDetails)
    private userRepository: Repository <tblUserDetails> ){}
              findOneByUsername (userName:string){
                return this.userRepository.findOne({where:{userName:userName}})
              }
}
