import { IsNotEmpty } from "class-validator";

import { tblVisitorVisitDate } from "src/tvv-date/entities/tvv-date.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BeforeInsert } from "typeorm";


@Entity()
export class tblUserDetails{

     @PrimaryGeneratedColumn()
    userId : number ;

    @Column({ unique: true , nullable:true})
    indexId : number;

    @Column()
    userName : string ;

    @Column()
    password  : string;

    @Column()
    shiftTime: string;

    @Column()
    designation : string;

    @Column({nullable:true , type:'bigint'})
    contactNumberL : number;

    @Column({nullable:true , type:'bigint' })
    contactNumberM : number;

    @Column()
    address : string ;

    @Column()
    userType : string ;

    @Column({  default:'nothing '})
    palmImage :string;
    
    @IsNotEmpty()
    @Column()
    photoImage :string ;

    @BeforeInsert()
    generateIndexId(){
       this.indexId = Math.floor(Math.random() * 1000);

    }

   
    @OneToMany(()=>tblVisitorVisitDate,(visitDate)=>visitDate.PassCancelledBy)
    visitDate:tblVisitorVisitDate[];


}
