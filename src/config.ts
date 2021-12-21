//Archivo para control de variables de entorno
import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      dbName: process.env.TYPEORM_DATABASE,
      user: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      port: parseInt(process.env.TYPEORM_PORT),
      host: process.env.TYPEORM_HOST,
    },
    app: {
      port: parseInt(process.env.APP_PORT),
    },
  };
});
