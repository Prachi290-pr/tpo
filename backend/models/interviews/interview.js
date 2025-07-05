const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');
const InterviewContent = require('./interviewContent');
const studentDetail = require('../studentDetailSchema');

// module.exports = (sequelize, DataTypes) => {
  const Interview = sequelize.define('Interviews', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'student_details', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complexity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    performance: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    timestamps: true,
  });

  module.exports = Interview;

  Interview.associate = (models) => {
    Interview.belongsTo(studentDetail, { foreignKey: 'userId', as: 'student_details' });
    Interview.hasMany(InterviewContent, { foreignKey: 'interviewId', as: 'interview_contents' });
  };

//   return Interview;
// };
