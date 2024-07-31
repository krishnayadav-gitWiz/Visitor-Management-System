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

  

  @Post('/addUser')
  async create (@Body() requestData:any):Promise<string>{
    const result = await this.userService.create(requestData);
    return 'user added sucessfully'
  }
  
@Get('/findAllUsers')
async findAll(@Req() req: Request) {
  const users = await this.userService.findAll();
  users.sort((a,b)=>b.userId-a.userId);
    

  return users;
}
//user by id

@Get('/findUser/:userId')
async findUserById(@Param('userId') userId: number) {
  const user = await this.userService.findById(userId);
  if (!user) {
    throw new NotFoundException('User not found');
  }

  const baseUrl = 'http://localhost:3000'; // Your frontend base URL
  const palmImage = user.palmImage ? `${baseUrl}${user.palmImage.replace('./uploads/', '/')}` : '';
  const photoImage = user.photoImage ? `${baseUrl}${user.photoImage.replace('./uploads/', '/')}` : '';

  const userWithImages = {
    ...user,
    palmImage,
    photoImage,
  };

  return userWithImages;
}





 //! Admin role 
  @Delete('/:userId')
  @UseGuards(new RoleGuard('Admin'))
  remove(@Param('userId') userId: number, @Req() req) {
    return this.userService.remove(+userId);
  }

  @Get(':userName')
  async findOne(@Param("userName") userName : string):Promise<tblUserDetails>{
    return this.userService.findOneByUsername(userName);
  }
  @Patch('/update/:userId')
  update(@Param('userId' ) userId:number,@Body() updatePasswordDto : UpdatePasswordDto){
    return this.userService.updatePassword(userId,updatePasswordDto.password)
  }

}
