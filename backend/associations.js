const Remark = require('./models/remarkSchema');
const { Company } = require('./models/companySchema');

// Company.hasMany(Remark, { foreignKey: 'companyId' });
// Remark.belongsTo(Company, { foreignKey: 'companyId' });
const JobPostings = require('./jobPostingSchema');
const Questions = require('./questionSchema');

JobPostings.hasMany(Questions, { foreignKey: 'JobPostingId' });
Questions.belongsTo(JobPostings, { foreignKey: 'JobPostingId' });

module.exports = {
  JobPostings,
  Questions,
};
