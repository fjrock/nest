import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => yaml.load(readFileSync('config/oracle.yml', 'utf8')) as Record<string, any>],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
