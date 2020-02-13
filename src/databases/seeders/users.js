const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports.seed = async (sequelize, { truncate, count }) => {
  try {
    const Users = sequelize.model('Users');

    // Remove all records
    if (truncate) await Users.truncate({ cascade: true, force: true });

    // Create new users
    let users = [];
    for (let i = 0; i < count; i++) {
      console.log(i + 1);
      users.push({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('123456', 10),
        role: 'user',
        avatar: faker.internet.avatar(),
        isVerified: faker.random.boolean()
      });
    }

    // Create new records
    return await Users.bulkCreate(users);
  } catch (error) {
    console.log(error);
  }
};
