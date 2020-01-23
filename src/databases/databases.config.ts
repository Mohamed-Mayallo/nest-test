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
      models: [__dirname + '/**/*.entity.js'],
      modelMatch: (filename, member) => {
        return (
          filename.substring(0, filename.indexOf('.entity')) ===
          member.toLowerCase()
        );
      }
    },
    production: <SequelizeOptions>{},
    test: <SequelizeOptions>{}
  };

  return stages[configService.get('NODE_ENV')];
};
