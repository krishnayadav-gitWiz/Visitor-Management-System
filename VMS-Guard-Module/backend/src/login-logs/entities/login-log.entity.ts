import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tblLoginReport {
    @PrimaryGeneratedColumn()
    indexId:number;
    
    @Column()
    userId:number;

    @Column()
    LogedInDateTime:Date;

    @Column({nullable:true})
    LogedOutDateTime:Date;
}

