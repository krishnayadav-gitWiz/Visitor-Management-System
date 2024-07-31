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


              // async create(files: { palmImage?: Express.Multer.File[], photoImage?: Express.Multer.File[] },
              //   createUserDto:CreateUserDto): Promise<string>  {
              //     console.log('Recieved files:' , files)
              //   let user  = new tblUserDetails();
              //   user.userName = createUserDto.userName;
              //   user.password = createUserDto.password;
              //   user.shiftTime = createUserDto.shiftTime;
              //   user.designation = createUserDto.designation;
              //   user.contactNumberL = createUserDto.contactNumberL;
              //   user.contactNumberM = createUserDto.contactNumberM;
              //   user.address = createUserDto.address;
              //   user.userType = createUserDto.userType;
                
              //   user.palmImage = files.palmImage ? this.generateImageUrl(files.palmImage[0].filename) : undefined;
              //   user.photoImage = files.photoImage ? this.generateImageUrl(files.photoImage[0].filename) : undefined;

              //   await this.userRepository.save(user);
              //   return 'user added sucessfully'

              //   }
              //   private generateImageUrl(filename: string): string {
              //     // Assuming you have a consistent way of constructing image URLs
              //     return `./uploads/${filename}`;
              //   }
              async create(requestData:any):Promise<string>{
                const user = new tblUserDetails();
                user.userName=requestData.userName;
                user.password=requestData.password;
                user.shiftTime=requestData.shiftTime;
                user.designation=requestData.designation;
                user.contactNumberL=requestData.contactNumberL;
                user.contactNumberM=requestData.contactNumberM;
                user.address=requestData.address;
                user.userType=requestData.userType;
                user.photoImage=requestData.photoImage;
                await this.userRepository.save(user);
                return 'user added sucessfully'
              }

    
              async findAll(): Promise<tblUserDetails[]> {
                return await this.userRepository.find({
                  order:{
                    
                  }
                });
              }
              async findById(userId: number): Promise<tblUserDetails> {
                return this.userRepository.findOne({where:{userId:userId}});
              }
              


              remove(userId: number) {
                return this.userRepository.delete(userId);
              }


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
