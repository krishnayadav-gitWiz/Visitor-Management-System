import { Column } from "typeorm";
import { IsNotEmpty } from "class-validator";
export class CreatetvvDateDto {
    
    @IsNotEmpty()
    @Column()
    Department:string;

    @IsNotEmpty()
    @Column()
    AllowedGates:string;
   
    @IsNotEmpty()
    @Column()
    validFor:string;

    @IsNotEmpty()
    @Column()
    AuthobyWhome:string;
     
    @IsNotEmpty()
    @Column()
    purpose:string;

    // @IsNotEmpty()
    // @Column()
    // noOfItems:string;

    @IsNotEmpty()
    @Column()
    toMeet:string;

    // @Column({type:'bigint'})
    // Barcode:number;


}
