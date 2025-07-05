const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
// import JobPostings from './jobPostingSchema.js';
const JobPostings = require('./jobPostingSchema.js');

const Announcement = sequelize.define('announcements', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'job_postings',
      key: 'id'
    }
  },
  announcement: {
    type: DataTypes.TEXT,
    allowNull: false
  },
//   createdAt: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW
//   }
}, {
//   tableName: 'announcements',
  timestamps: true
});

Announcement.belongsTo(JobPostings, { as: 'job_postings', foreignKey: 'post_id' });

module.exports = Announcement;