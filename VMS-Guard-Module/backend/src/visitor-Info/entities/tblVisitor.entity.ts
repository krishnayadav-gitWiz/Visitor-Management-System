import { Entity,Column,BeforeInsert, PrimaryGeneratedColumn ,OneToMany} from "typeorm";
import { tblVisitorVisitDate } from "src/tvv-date/entities/tvv-date.entity";
import { IsNotEmpty } from "class-validator";

@Entity()
export class tblVisitor {
    
    @PrimaryGeneratedColumn()
    Id:number;

    @Column({ unique: true })
    indexId:number;

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

    @Column({type:'bigint'})
    vMobileNo: number;

    @Column()
    visitorType: string ;
    
    @IsNotEmpty()
    @Column()
    vPhoto:string;

    @IsNotEmpty()
    @Column()
    vSignature:string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    vCommingDate: Date;

    @BeforeInsert()
    generateIndexId(){
       this.indexId = Math.floor(Math.random() * 1000);

    }
    @BeforeInsert()
    updateDates() {
      this.vCommingDate = new Date(); 
    }
 
    @OneToMany(() => tblVisitorVisitDate, (visitorDate)=>visitorDate.visitor)
    visitorDates: tblVisitorVisitDate[];
}
