import { Sequelize } from 'sequelize-typescript';

const config = {
  development: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345678',
    database: 'nest-test',
    models: [__dirname + '/**/*.entity.js'],
    modelMatch: (filename, member) => {
      return (
        filename.substring(0, filename.indexOf('.entity')) ===
        member.toLowerCase()
      );
    }
  },
  production: {},
  test: {}
};

// postgres url: postgresql://postgres@localhost:5432/nest-test

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '12345678',
        database: 'nest-test',
        models: [process.cwd() + '/**/*.entity.js'],
        modelMatch: (filename, member) => {
          return (
            filename.substring(0, filename.indexOf('.entity')) ===
            member.toLowerCase()
          );
        }
      });
      // To drop all tables and create new ones (for test)
      // await sequelize.sync({ force: true });
      // Have to use migration to add new fields
      await sequelize.sync();
      return sequelize;
    }
  }
];
