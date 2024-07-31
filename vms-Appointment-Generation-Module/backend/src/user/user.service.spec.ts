// user.service.spec.ts
// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { UserService } from './user.service';
// import { tblUserDetails } from './entities/user.entity';
// import { CreateUserDto } from './dto/create-user.dto';

// describe('UserService', () => {
//   let userService: UserService;
//   let userRepository: Repository<tblUserDetails>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UserService,
//         {
//           provide: getRepositoryToken(tblUserDetails),
//           useClass: Repository,
//         },
//       ],
//     }).compile();

//     userService = module.get<UserService>(UserService);
//     userRepository = module.get<Repository<tblUserDetails>>(
//       getRepositoryToken(tblUserDetails),
//     );
//   });

//   it('should be defined', () => {
//     expect(userService).toBeDefined();
//   });

//   describe('create', () => {
//     it('should create a user with images', async () => {
//       const createUserDto: CreateUserDto = {
    
//                 userName: 'testUser',
//                 password: 'testPassword',
//                 shiftTime: '9 AM - 5 PM',
//                 designation: 'Employee',
//                 contactNumberL: 1234567890,
//                 contactNumberM: 9876543210,
//                 address: '123 Main St, City',
//                 userType: 'Normal_user',
//                 // palmImage: '',
//                 // photoImage: ''
//         // Fill in the user data here
//       };

//       const palmImageFile = {
//         fieldname: 'palmImage',
//         originalname: 'palm_image.jpg',
//         encoding: '7bit',
//         mimetype: 'image/jpeg',
//         size: 12345, // specify the size here
//         buffer: Buffer.from('fake_image_data', 'base64'), // specify the image data here
//       };

//       const photoImageFile = {
//         fieldname: 'photoImage',
//         originalname: 'photo_image.jpg',
//         encoding: '7bit',
//         mimetype: 'image/jpeg',
//         size: 54321, // specify the size here
//         buffer: Buffer.from('fake_image_data', 'base64'), // specify the image data here
//       };

//       const files = {
//         palmImage: [palmImageFile],
//         photoImage: [photoImageFile],
//       };

//       jest.spyOn(userRepository, 'save').mockResolvedValue({} as tblUserDetails);

//       const result = await userService.create(files, createUserDto);

//       expect(result).toEqual('user added sucessfully');
//       expect(userRepository.save).toHaveBeenCalledWith(expect.any(tblUserDetails));
//     });
//   });
// });

