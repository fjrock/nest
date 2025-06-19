import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { OracleService } from '../services/oracle.service';
import { JwtAuthGuard } from '../config/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly oracleService: OracleService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello() {
    return { mensaje: this.appService.getHello() };
  }

  @UseGuards(JwtAuthGuard)
  @Get('saludo')
  getSaludo() {
    return { mensaje: '¡Hola desde NestJS!' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('mensaje-oracle')
  async getMensajeOracle() {
    const mensaje = await this.oracleService.obtenerMensaje();
    return { mensaje };
  }
}
