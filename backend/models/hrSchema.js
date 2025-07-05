const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');
const Company = require('./companySchema');

const Hr = sequelize.define('hr', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alternate_contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'companies', 
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'hr',
  timestamps: true,
});

Hr.belongsTo(Company, { foreignKey: 'company_id', as: 'companies' });

module.exports = Hr;
