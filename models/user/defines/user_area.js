const Sequelize = require('sequelize');
const sequelize = require('../../../db/database');



// * Modelo de consulta  lgecb.user_areas
const User_area = sequelize.define('user_areas', {
    desc_area: {
      type: Sequelize.STRING,
      allowNull: false
    },
    id_area: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    smb_area: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  });

  module.exports = User_area;
