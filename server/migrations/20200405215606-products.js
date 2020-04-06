'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      ASIN: {
        type: new Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: new Sequelize.STRING,
        allowNull: true
      },
      dimensions: {
        type: new Sequelize.STRING,
        allowNull: true
      },
      rank: {
        type: new Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: new Sequelize.DATE
      },
      updatedAt: {
        type: new Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.dropTable('products');
  }
};
