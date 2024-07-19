'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert(
      "role_permissions",
      [
        {
          role_id: 1,
          module_id: 1,
          is_read: 1,
          is_create: 1,
          is_edit: 1,
          is_delete: 1,
          created_at: new Date()
        },
        {
          role_id: 1,
          module_id: 2,
          is_read: 1,
          is_create: 1,
          is_edit: 1,
          is_delete: 1,
          created_at: new Date()
        },
        {
          role_id: 1,
          module_id: 3,
          is_read: 1,
          is_create: 1,
          is_edit: 1,
          is_delete: 1,
          created_at: new Date()
        },
        {
          role_id: 1,
          module_id: 4,
          is_read: 1,
          is_create: 1,
          is_edit: 1,
          is_delete: 1,
          created_at: new Date()
        },
        {
          role_id: 1,
          module_id: 5,
          is_read: 1,
          is_create: 1,
          is_edit: 1,
          is_delete: 1,
          created_at: new Date()
        },
       


        
        {
          role_id: 2,
          module_id: 1,
          is_read: 1,
          is_create: 1,
          is_edit: 1,
          is_delete: 1,
          created_at: new Date()
        },
        {
          role_id: 2,
          module_id: 4,
          is_read: 1,
          is_create: 1,
          is_edit: 1,
          is_delete: 1,
          created_at: new Date()
        },
        {
          role_id: 2,
          module_id: 5,
          is_read: 1,
          is_create: 1,
          is_edit: 1,
          is_delete: 1,
          created_at: new Date()
        },
       
        {
          role_id: 3,
          module_id: 1,
          is_read: 1,
          is_create: 1,
          is_edit: 1,
          is_delete: 1,
          created_at: new Date()
        },
        {
          role_id: 3,
          module_id: 5,
          is_read: 1,
          is_create: 1,
          is_edit: 1,
          is_delete: 1,
          created_at: new Date()
        },
        {
          role_id: 3,
          module_id: 6,
          is_read: 1,
          is_create: 1,
          is_edit: 1,
          is_delete: 1,
          created_at: new Date()
        },
        {
          role_id: 3,
          module_id: 6,
          is_read: 1,
          is_create: 1,
          is_edit: 1,
          is_delete: 1,
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
