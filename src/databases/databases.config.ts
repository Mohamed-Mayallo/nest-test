import { SequelizeOptions } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';

export const config = (configService: ConfigService) => {
  const stages = {
    development: <SequelizeOptions>{
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASS'),
      database: configService.get('DB_NAME'),
      models: [process.cwd() + '/**/*.entity.{ts,js}'], // At dev env, dist will be generated so will read from dist => *.js
      modelMatch: (filename, member) => {
        return (
          filename.substring(0, filename.indexOf('.entity')) ===
          member.toLowerCase()
        );
      }
    },
    production: <SequelizeOptions>{},
    test: <SequelizeOptions>{
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASS'),
      database: configService.get('TEST_DB_NAME'),
      models: [process.cwd() + '/**/*.entity.{ts,js}'], // At test env, no dist will be generated so will read from *.ts
      modelMatch: (filename, member) => {
        return (
          filename.substring(0, filename.indexOf('.entity')) ===
          member.toLowerCase()
        );
      }
    }
  };

  return stages[configService.get('NODE_ENV')];
};
