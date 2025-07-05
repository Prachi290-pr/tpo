'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Define relationships explicitly
db.JobPostings.hasMany(db.Questions, { foreignKey: 'job_postingId' });
db.Questions.belongsTo(db.JobPostings, { foreignKey: 'job_postingId' });
// Company.hasMany(Remark, { foreignKey: 'companyId' });
// Remark.belongsTo(Company, { foreignKey: 'companyId' });
db.Company.hasMany(db.Remark, { foreignKey: 'companyId' });
db.Remark.belongsTo(db.Company, { foreignKey: 'companyId' });

//
// JobPosting.belongsTo(Company, { as: 'company', foreignKey: 'companyId' });
// Announcement.belongsTo(JobPosting, { as: 'jobPosting', foreignKey: 'post_id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
