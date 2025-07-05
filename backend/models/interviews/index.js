// const sequelize = require('../../config/config.js');
// const { DataTypes } = require('sequelize');
// const initUser = require('../studentDetailSchema.js');
// const initInterview = require('./interview.js');
// const initInterviewContent = require('./interviewContent.js');
// const initInterviewDetail = require('./interviewDetail.js');

// const User = initUser(sequelize, DataTypes);
// const Interview = initInterview(sequelize, DataTypes);
// const InterviewContent = initInterviewContent(sequelize, DataTypes);
// const InterviewDetail = initInterviewDetail(sequelize, DataTypes);

// User.hasMany(Interview, { foreignKey: 'userId' });
// Interview.belongsTo(User, { foreignKey: 'userId' });

// Interview.hasMany(InterviewContent, { foreignKey: 'interviewId' });
// InterviewContent.belongsTo(Interview, { foreignKey: 'interviewId' });

// module.exports = {
//   sequelize,
//   User,
//   Interview,
//   InterviewContent,
//   InterviewDetail,
// };
