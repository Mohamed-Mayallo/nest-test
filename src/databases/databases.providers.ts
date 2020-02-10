import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { config } from './databases.config';
import { ConfigService } from '@nestjs/config';

// postgres url: postgresql://postgres@localhost:5432/nest-test

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize(<SequelizeOptions>config(configService));
      // To drop all tables and create new ones (for test)
      // Have to use migration to add new fields if force was false
      await sequelize.sync({
        ...(configService.get('NODE_ENV') === 'test' && { force: true })
      });
      return sequelize;
    },
    inject: [ConfigService]
  }
];
