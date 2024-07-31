import { Column } from "typeorm";
import { CreateUserDto } from "./create-user.dto";



export class UpdateUserDto extends CreateUserDto {
    @Column()
    password: string;
}
