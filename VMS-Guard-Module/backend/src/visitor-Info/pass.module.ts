import { Module } from '@nestjs/common';
import { PassService } from './pass.service';
import { PassController } from './pass.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tblVisitor } from './entities/tblVisitor.entity';
import { PassRepository } from './repo/pass.repository';

@Module({
  imports :[TypeOrmModule.forFeature([tblVisitor])],
  controllers: [PassController],
  providers: [PassService,PassRepository],
  exports:[PassService]
})
export class PassModule {}
