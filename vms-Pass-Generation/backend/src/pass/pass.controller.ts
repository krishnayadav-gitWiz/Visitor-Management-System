import { Controller, Get,Req,UploadedFiles,NotFoundException, Post, Body, Patch, Param, Delete,UseInterceptors, Put, InternalServerErrorException } from '@nestjs/common';
import { PassService } from './pass.service';
import { tblVisitor } from './entities/tblVisitor.entity';
import { UpdatePassDto } from './dto/update-pass.dto';



@Controller('pass')
export class PassController {
  constructor(private readonly passService: PassService) {}

  @Post('/addUser')
  async createVisitor(@Body() requestData: any): Promise<string> {
    const result = await this.passService.create(requestData);
    return 'user added successfully'
  }

 
  @Get('/findAllvisitors') // Define your GET endpoint path
  async getUsers(): Promise<tblVisitor[]> {
    // Fetch user data, including vPhoto and vSignature
    const users = await this.passService.getAllUsers();
     
    // Return the user data in the response
    return users;
  } 


  
//get a visitor by Id
@Get('/findUser/:Id')
async findUserById(@Param('Id') Id: number) {
  const user = await this.passService.findById(Id);
  return user;
 
}

//update visitor details 
@Put('editVisitor/:Id')
async updateUserById(
  @Param('Id') Id: number,
  @Body() updatePassDto: UpdatePassDto,
): Promise<void> {
  try {
    await this.passService.updateUserById(Id, updatePassDto);
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    } else {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}

}
