import { SequelizeOptions } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';

export const config = (configService: ConfigService) => {
  return <SequelizeOptions>{
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASS'),
    database:
      configService.get('NODE_ENV') === 'test'
        ? configService.get('TEST_DB_NAME')
        : configService.get('DB_NAME'),
    models:
      configService.get('NODE_ENV') === 'test'
        ? // At test env, no dist will be generated so will read from *.ts
          [process.cwd() + '/**/*.entity.ts']
        : // At dev env, dist will be generated so will read from dist => *.js
          [process.cwd() + '/**/*.entity.js'],
    modelMatch: (filename, member) => {
      return (
        filename.substring(0, filename.indexOf('.entity')) ===
        member.toLowerCase()
      );
    }
  };
};
