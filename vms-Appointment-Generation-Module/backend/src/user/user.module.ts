import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repo/user.repository';
import {  tblUserDetails } from './entities/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';


@Module({
  imports : [TypeOrmModule.forFeature([tblUserDetails])
],
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports : [UserService]
})
export class UserModule {}
