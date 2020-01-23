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
      // await sequelize.sync({ force: true });
      // Have to use migration to add new fields
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService]
  }
];
