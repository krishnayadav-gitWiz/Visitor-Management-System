import { Controller,UseInterceptors,UploadedFiles, Get,NotFoundException, Post, Body, Patch,Req, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { tblUserDetails } from './entities/user.entity';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  


  @Get(':userName')
  async findOne(@Param("userName") userName : string):Promise<tblUserDetails>{
    return this.userService.findOneByUsername(userName);
  }
 

}
