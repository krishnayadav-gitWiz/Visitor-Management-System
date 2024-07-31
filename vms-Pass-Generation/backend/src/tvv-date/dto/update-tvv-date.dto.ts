import { PartialType } from '@nestjs/mapped-types';
import { CreatetvvDateDto } from './create-tvv-date.dto';
import { Column } from 'typeorm';

export class UpdateTvvDateDto extends PartialType(CreatetvvDateDto) {

    @Column()
    Access:boolean;

    // @Column()
    // PassCancelledBy:number;

    @Column()
    PassCancelledAt:string;
}
