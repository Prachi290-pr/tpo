const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); 
const Company = require('./companySchema.js');
// const Forum = require('./forumSchema.js');

// import Company from './companySchema.js';
// const 
// const Company = 

const IntershipPost = sequelize.define('intership_posting', {
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'companies',
      key: 'id'
    }
  },
  remarkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'remarks',
      key: "id",    
    }
  },
  job_description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  package_details: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roles: {
    type: DataTypes.STRING,
    allowNull: false
  },
  criteria_10th: {
    type: DataTypes.STRING,
    allowNull: false
  },
  criteria_12th: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deg_criteria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  diploma_criteria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eligible_branches: {
    type: DataTypes.STRING,
    allowNull: false
  },
  docs: {
    type: DataTypes.STRING,
    allowNull: true
  },
  docs2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  docs3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tracker: {
    type: DataTypes.STRING,
    allowNull: true
  },
  deadline:{
    type:DataTypes.DATE,
    allowNull:true
  },
  extLink:{
    type:DataTypes.STRING,
    allowNull:true
  },
  batch_date: {
    type: DataTypes.STRING,
    allowNull: false,
  }
 
}, {
//   tableName: 'job_postings',
  timestamps: true,
});

// JobPostings.belongsTo(Company, { foreignKey: 'company_id' });
// JobPostings.belongsTo(Company, { as: 'companies', foreignKey: 'companyId' });
// Forum.belongsTo(JobPostings, { foreignKey: 'post_id', as: 'job_postings' });

module.exports = IntershipPost;
