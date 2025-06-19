import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { OracleService } from './services/oracle.service';
import { AuthModule } from './config/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => yaml.load(readFileSync('config/oracle.yml', 'utf8')) as Record<string, any>],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, OracleService],
})
export class AppModule {}
