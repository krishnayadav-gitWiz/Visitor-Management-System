import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty,IsNumber } from "class-validator";

@Entity()
export class tblAppoinTmentGenerate {

    @PrimaryGeneratedColumn()
    id : number;

    
    @Column({ unique: true , nullable:true})
    indexNo : number ;

    @Column({unique:true ,nullable:true})
    AppointmentId : number;

    
    @Column()
    @IsNotEmpty()
    fName : string ;

    @Column()
    @IsNotEmpty()
    lName : string ;

    @Column()
    @IsNotEmpty()
    DateofBirth : string ;

    @Column()
    @IsNotEmpty()
    vehicleNo : string ;

    @Column()
    @IsNotEmpty()
    address : string;

    @Column({ type: 'bigint'})
    @IsNotEmpty()
    mobileNo : Number ;

    @Column()
    @IsNotEmpty()
    AuthorizedBy : string ;

    @Column()
    @IsNotEmpty()
    EmpId : string ; 

    @CreateDateColumn({ nullable: true })
    generateAppointmentTime : Date ;
    constructor()
    {
    this.generateAppointmentTime = new Date();
    }

    @BeforeInsert()
    generateIndexNo(){
       this.indexNo = Math.floor(Math.random() * 1000);

    }

    @BeforeInsert()
    generateAppoitmentID()
    {
        this.AppointmentId = Math.floor(Math.random()*10000)
    }

    get formattedGenerateAppointmentTime(): string {
      if (this.generateAppointmentTime) {
        // Convert the date to IST format
        return this.generateAppointmentTime.toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata', // IST Time Zone
          dateStyle: 'short',
          timeStyle: 'short',
        })
      }
    }
   
}
