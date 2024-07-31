import { PartialType } from '@nestjs/mapped-types';
import { CreatetblVisitorDto } from './create-tblVisitor.dto';

export class UpdatePassDto extends PartialType(CreatetblVisitorDto) {}
