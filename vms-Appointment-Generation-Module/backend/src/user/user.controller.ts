import { Controller,UseInterceptors,UploadedFiles, Get,NotFoundException, Post, Body, Patch,Req, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { tblUserDetails } from './entities/user.entity';
import { RoleGuard } from 'src/auth/guard/role.guard';
import {UseGuards} from '@nestjs/common';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


import * as fs from 'fs';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

 

  @Get(':userName')
  async findOne(@Param("userName") userName : string):Promise<tblUserDetails>{
    return this.userService.findOneByUsername(userName);
  }
  @Patch('/update/:userId')
  update(@Param('userId' ) userId:number,@Body() updatePasswordDto : UpdatePasswordDto){
    return this.userService.updatePassword(userId,updatePasswordDto.password)
  }

}
