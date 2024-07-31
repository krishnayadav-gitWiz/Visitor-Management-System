import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";
export class CreatetblVisitorDto {
    
    @Column()
    vFirstName: string;

    @Column()
    vLastName :string ;

    @Column()
    vDateOfBirth:string;

    @Column()
    vehicleNo:string;

    @Column()
    vAddress: string;

    @Column()
    vMobileNo: number;

    @Column()
    visitorType: string ;

    @Column()
    vPhoto:string;
   @IsNotEmpty()
    @Column()
    vSignature:string;
}
