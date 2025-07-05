const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');

const InterviewDetail = sequelize.define('Interview_Details', {
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // totalScore: {
  //   type: DataTypes.INTEGER
  // }
}, {
  timestamps: true,
  // Other options can go here
});

module.exports = InterviewDetail;