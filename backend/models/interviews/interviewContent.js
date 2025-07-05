const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');
const Interview = require('./interview');

// module.exports = (sequelize, DataTypes) => {
  const InterviewContent = sequelize.define('Interview_Contents', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ideal_answer: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    interviewId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Interviews',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  }, {
    timestamps: true,
  });

  module.exports = InterviewContent;

  InterviewContent.associate = (models) => {
    InterviewContent.belongsTo(Interview, { foreignKey: 'interviewId', as: 'interviews' });
  };

//   return InterviewContent;
// };
