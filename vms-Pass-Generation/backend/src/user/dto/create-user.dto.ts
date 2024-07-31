import { PrimaryGeneratedColumn,Column } from "typeorm";

export class CreateUserDto {

    @Column()
    userName : string ;

    @Column()
    password  : string;

    @Column()
    shiftTime: string;

    @Column()
    designation : string;

    @Column()
    contactNumberL : number;

    @Column()
    contactNumberM : number;

    @Column()
    address : string ;

    @Column()
    userType : string ;


    @Column({nullable:true})
    photoImage : string;
    
}
