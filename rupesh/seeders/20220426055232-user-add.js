"use strict";
// const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const hashPassword = await to(bcrypt.hash('12345678', bcrypt.genSalt(10)));
    //has for 12345678
    // mailto:admin@mailinator.com / 12345678
    const password = "$2b$10$DIaFlYypNqxE7kSL394bquv/uF0nrfVnuDdqn07TZf/FympB3VHPu";
    await queryInterface.bulkInsert(
      "users",
      [
        {
          first_name: "Admin",
          email: "admin@rupesh.com",
          profile_image: "test.png",
          password: password,
          last_name: "Access",
          mobile: 1234567890,
          role_id: 1,
          status: 1,
          created_at: new Date()
        },
        {
          first_name: "Guest",
          email: "guest@rupesh.com",
          profile_image: "test.png",
          password: password,
          last_name: "Access",
          mobile: 1234567890,
          role_id: 1,
          status: 1,
          created_at: new Date()
        },
        {
          first_name: "Maneger",
          email: "maneger@rupesh.com",
          profile_image: "test.png",
          password: password,
          last_name: "Access",
          mobile: 1234567890,
          role_id: 1,
          status: 1,
          created_at: new Date()
        },
        
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
