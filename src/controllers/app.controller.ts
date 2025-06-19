import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { OracleService } from '../services/oracle.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly oracleService: OracleService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('saludo')
  getSaludo(): string {
    return '¡Hola desde NestJS!';
  }

  @Get('mensaje-oracle')
  async getMensajeOracle(): Promise<string> {
    return await this.oracleService.obtenerMensaje();
  }
}
