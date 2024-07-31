import { Column } from "typeorm";
import { CreateUserDto } from "./create-user.dto";
import { isNotEmpty } from "class-validator";


export class UpdateUserDto extends CreateUserDto {
    @Column()
    password: string;
}
