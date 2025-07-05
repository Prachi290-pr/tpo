const { DataTypes } = require('sequelize');
const sequelize  = require('../config/config.js');
const JobPostings = require('./jobPostingSchema.js');
// const StudentDetail = require('./studentDetailSchema.js');

const Forum = sequelize.define('forums', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'job_postings',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  stud_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'student_details',
      key: 'id'
    },
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  question_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  answer_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
//   createdAt: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW,
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW,
//   }
}, {
//   tableName: 'forum',
  timestamps: true, 
});

Forum.belongsTo(JobPostings, {as: 'job_postings', foreignKey: 'post_id' });

module.exports = Forum;