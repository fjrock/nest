import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as oracledb from 'oracledb';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Obtener configuración de Oracle
  const configService = app.get(ConfigService);
  const oracleConfig = configService.get('oracle');

  // Ejemplo de conexión a Oracle
  try {
    const connection = await oracledb.getConnection({
      user: oracleConfig.user,
      password: oracleConfig.password,
      connectString: oracleConfig.connectString,
    });
    console.log('✅ Conexión a Oracle exitosa');
    await connection.close();
  } catch (err) {
    console.error('❌ Error conectando a Oracle:', err.message);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
