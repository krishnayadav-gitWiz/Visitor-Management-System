import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PassModule } from './visitor-Info/pass.module';
import { TvvDateModule } from './tvv-date/tvv-date.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginLogsModule } from './login-logs/login-logs.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true, envFilePath:['.local.env']}),
    ServeStaticModule.forRoot({
      rootPath:join(__dirname,'..','uploads')
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
        type:'postgres',
        host:configService.get('DATABASE_HOST'),
        port:configService.get('DATABASE_PORT'),
        username:configService.get('DATABASE_USERNAME'),
        password:configService.get('DATABASE_PASSWORD'),
        synchronize:configService.get('DATABASE_SYNC'),
        database:configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging: true

      })

    }),
    
    AuthModule,PassModule,TvvDateModule,UserModule,LoginLogsModule],
 
})
export class AppModule {}
