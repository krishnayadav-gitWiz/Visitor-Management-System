import { Column } from "typeorm";

export class UpdatePasswordDto {
    @Column()
    password : string;
}