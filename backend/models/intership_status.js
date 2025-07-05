// ADD THE DRIVE STATUS SCHEMA
// ADD THE DRIVE STATUS SCHEMA
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Adjust the path to your database configuration

const IntershipStatus = sequelize.define('IntershipStaus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  s_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  p_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  que_answers: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  round1: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
  round2: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
  round3: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
  round4: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
  placedStudent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'intership_status',
  timestamps: false,
});

module.exports = IntershipStatus;
