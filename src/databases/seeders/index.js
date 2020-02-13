const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize-typescript');

const env = dotenv.parse(
  fs.readFileSync(path.join(__dirname, '../../../.env'))
);

if (env.NODE_ENV === 'production') {
  console.log('ERROR: Cannot seed on production.');
  process.exit(1);
}

async function Seed() {
  // Connect to db
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    models: [process.cwd() + '/**/*.entity.js'],
    modelMatch: (filename, member) => {
      return (
        filename.substring(0, filename.indexOf('.entity')) ===
        member.toLowerCase()
      );
    }
  });

  // Get npm remaining args like >> yarn seed users
  const args = process.argv.slice(2);

  if (!args.length) {
    console.log('ERROR: Specify a model for seeding.');
    process.exit(1);
  }

  // Get file name
  const seedList = [args[0]];
  let config = {
    truncate: false,
    count: 25
  };

  const countArg = args.find(arg => arg.includes('--count='));
  const truncateArg = args.find(arg => arg.includes('--truncate'));

  if (truncateArg) config.truncate = true;
  if (countArg) {
    const c = countArg.split('=')[1];
    if (Number.isInteger(parseInt(c))) config.count = Number(c);
  }

  const seeds = seedList.reduce((prev, file) => {
    return prev.then(() => {
      const seeder = require(`./${file}`);
      console.log(`Seeding: ${file}`);
      return seeder.seed(sequelize, config).then(records => {
        console.log(`Seeded ${file}: ${records.length} records.`);
      });
    });
  }, Promise.resolve(true));

  // Wait for all seeders to finish.
  await seeds;

  // Exit with success
  process.exit(0);
}

Seed().catch(e => {
  console.error(e);
  // Exit with fail
  process.exit(1);
});
