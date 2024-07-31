import { PartialType } from '@nestjs/mapped-types';
import { CreatetblVisitorDto } from './create-tblVisitor.dto';
import { Column } from 'typeorm';
import { IsNotEmpty,  } from 'class-validator';

export class UpdatePassDto extends PartialType(CreatetblVisitorDto) {
    @IsNotEmpty()
    @Column()
    vFirstName: string;

    @IsNotEmpty()
    @Column()
    vLastName :string ;

    @IsNotEmpty()
    @Column()
    vDateOfBirth:string;

    @IsNotEmpty()
    @Column()
    vehicleNo:string;

    @IsNotEmpty()
    @Column()
    vAddress: string;

    @IsNotEmpty()
    @Column()
    vMobileNo: number;

    @IsNotEmpty()
    @Column()
    visitorType: string ;

    @IsNotEmpty()
    @Column()
    vPhoto:string;
    
  
    @Column({default:'xyzxyz'})
    vSignature:string;
}
