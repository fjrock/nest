import { Controller, Post, Body, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    try {
      const user = await this.authService.validateUser(body.username, body.password);
      if (!user) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      return this.authService.login(user);
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error interno en el servidor');
    }
  }
} 