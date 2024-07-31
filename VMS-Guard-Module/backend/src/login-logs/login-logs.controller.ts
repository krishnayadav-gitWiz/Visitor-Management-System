import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LoginLogsService } from './login-logs.service';
import { CreateLoginLogDto } from './dto/create-login-log.dto';

@Controller('login-logs')
export class LoginLogsController {
  constructor(private readonly loginLogsService: LoginLogsService) {}

  @Post('/addLogs')
 async logLogin(@Body() loginDto:CreateLoginLogDto){
  await this.loginLogsService.logLogin(loginDto);
  return{message:'login logged successfully'}
 }


  @Put('/update/:userId')
  async updateLoginReport(
    @Param("userId") userId : number ){
      return this.loginLogsService.updateLoginReport(userId)
    }

  
}
