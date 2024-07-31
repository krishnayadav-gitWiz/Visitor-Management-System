import { IsNotEmpty } from 'class-validator';
import { tblVisitor } from 'src/pass/entities/tblVisitor.entity';
import { tblUserDetails } from 'src/user/entities/user.entity';
import {Column, Entity, BeforeInsert,PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
@Entity()
export class tblVisitorVisitDate {
    @PrimaryGeneratedColumn()
    indexId:number;

    @Column({default:'0'})
    PassNumber:Number;

     @IsNotEmpty()
    @Column({type:'bigint'})
    Barcode:number;
    
    @IsNotEmpty()
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    vDate: Date;

    @IsNotEmpty()
    @Column()
    toMeet:string;

    @IsNotEmpty()
    @Column()
    Department: string ;
    
    @IsNotEmpty()
    @Column({default:'not available'})
    noOfItems: string;

    
    @Column({nullable:true})
    AllowedGates: string;
   
    
    @Column({nullable:true})
    validFor: string;
    
    @IsNotEmpty()
    @Column()
    AuthobyWhome: string;

    @IsNotEmpty()
    @Column()
    purpose:string;

    @Column({default:true})
    Access:Boolean;

    @Column({default:'not cancelled'})
    PasscancelledAt:string;

    // @Column({default:'0000'})
    // PassCancelledBy:number


    @BeforeInsert()
    updateDates() {
      this.vDate = new Date(); // Set the current date and time before inserting
    }

    @ManyToOne(()=>tblVisitor,(visitor)=>visitor.visitorDates)
    visitor:tblVisitor;
    @ManyToOne (()=>tblUserDetails,(PassCancelledBy)=>PassCancelledBy.visitDate)
    PassCancelledBy:tblUserDetails;

    @BeforeInsert()
    generatePassNo(){
      this.PassNumber = Math.floor(100000000 + Math.random()*900000000);
    }

    

    @BeforeInsert()
    generateBarcode() {
      // Generate an 18-digit barcode
      this.Barcode = Math.floor(100000000000000000 + Math.random() * 900000000000000000);
    }
}
