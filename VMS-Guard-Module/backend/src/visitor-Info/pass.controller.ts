import { Controller, Get,Req,UploadedFiles,NotFoundException, Post, Body, Patch, Param, Delete,UseInterceptors } from '@nestjs/common';
import { PassService } from './pass.service';
import { CreatetblVisitorDto } from './dto/create-tblVisitor.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {extname} from 'path';
import { tblVisitor } from './entities/tblVisitor.entity';



@Controller('pass')
export class PassController {
  constructor(private readonly passService: PassService) {}

 
 
  @Get('/findAllvisitors') // Define your GET endpoint path
  async getUsers(): Promise<tblVisitor[]> {
    // Fetch user data, including vPhoto and vSignature
    const users = await this.passService.getAllUsers();
     
    // Return the user data in the response
    return users;
  } 

}
