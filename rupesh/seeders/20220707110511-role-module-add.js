'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert(
      "role_modules",
      [
        {
          parent_id: 0,
          name: "Dashboard",
          icon: "bx bx-home-circle",
          route: '',
          action: 'dashboard',
          is_dropdown: 0,
          is_readonly: 0,
          created_at: new Date()
        },
        {
          parent_id: 0,
          name: "Profile",
          icon: "bx bx-user-circle",
          route: '',
          action: '',
          is_dropdown: 1,
          is_readonly: 0,
          created_at: new Date()
        },
        {
          parent_id: 2,
          name: "Roles",
          icon: "",
          route: '',
          action: 'roles',
          is_dropdown: 0,
          is_readonly: 0,
          created_at: new Date()
        },
        {
          parent_id: 0,
          name: "CRUD",
          icon: "bx bx-home-circle",
          route: '',
          action: '',
          is_dropdown: 1,
          is_readonly: 0,
          created_at: new Date()
        },
        {
          parent_id: 4,
          name: "Simple Crud",
          icon: "",
          route: '',
          action: 'simple-crud',
          is_dropdown: 0,
          is_readonly: 0,
          created_at: new Date()
        },
        {
          parent_id: 4,
          name: "Complex Crud",
          icon: "",
          route: '',
          action: 'complex-crud',
          is_dropdown: 0,
          is_readonly: 0,
          created_at: new Date()
        },
       
      ],
      {}
    );


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
