import { Column } from "typeorm";

export class CreateLoginLogDto {
    @Column()
    userId:number;

    @Column()
    LogedInDateTime:Date;
    
    @Column()
    LogedOutDateTime:string;
   
}
