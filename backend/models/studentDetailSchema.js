const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); 
// const Forum = require('./forumSchema.js');
const Forum = require('./forumSchema.js');

const StudentDetail = sequelize.define('student_details', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  pass: {
    type: DataTypes.STRING,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  middle_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  clg_id: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: true
  },
  tpo_id: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: true
  },
  degree: {
    type: DataTypes.STRING,
    allowNull: true
  },
  loc: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ssc_per: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  ssc_year: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  hsc_per: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  hsc_year: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  diploma_per: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  diploma_year: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  degree_per: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  degree_cgpa: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  degree_year: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  resume: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
//   tableName: 'student_details'
});

StudentDetail.hasMany(Forum, { foreignKey: 'stud_id', as: 'forums' });
Forum.belongsTo(StudentDetail, { foreignKey: 'stud_id', as: 'student_details' });

module.exports = StudentDetail;