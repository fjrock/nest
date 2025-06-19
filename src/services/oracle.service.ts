import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as oracledb from 'oracledb';

@Injectable()
export class OracleService {
  constructor(private configService: ConfigService) {}

  async obtenerMensaje(): Promise<string> {
    const oracleConfig = this.configService.get('oracle');
    let connection;
    try {
      connection = await oracledb.getConnection({
        user: oracleConfig.user,
        password: oracleConfig.password,
        connectString: oracleConfig.connectString,
      });
      const result = await connection.execute(
        `BEGIN PKG_PRUEBA.obtener_mensaje(:p_resultado); END;`,
        {
          p_resultado: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
        }
      );
      return result.outBinds.p_resultado;
    } catch (err) {
      throw new Error('Error llamando al procedure: ' + err.message);
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }
} 