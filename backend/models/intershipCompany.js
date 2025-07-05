const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
// const Remark = require('../models/remarkSchema');
// const AcademicYear = require("./academicYearSchema");
// require("../associations");

const InternCompany = sequelize.define('intershiip_companies', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // industry: {
  //   type: DataTypes.STRING,
  //   allowNull: false
  // },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mode_of_communication: {
    type: DataTypes.STRING,
    allowNull: false
  },
  academic_year: {
    type: DataTypes.STRING,
    allowNull: false,
    // get() {
    //   const rawValue = this.getDataValue('academic_year');
    //   return rawValue ? rawValue.split(',') : [];
    // },
    // set(value) {
    //   this.setDataValue('academic_year', value.join(','));
    // }
  },
  visited: {
    type: DataTypes.STRING,
    defaultValue: 1,
  },
  turnover: {
    type: DataTypes.STRING,
    defaultValue: 0,
  }
}, {
  timestamps: true
});

// InternCompany.associate = (models) => {
//   Company.hasMany(models.Remark, {
//       foreignKey: 'companyId',
//       as: 'remarks'
//   });
// };

// Company.hasMany(Remark, { foreignKey: 'companyId' });
// Remark.belongsTo(Company, { foreignKey: 'companyId' });

// Company.associate = (models) => {
//   Company.hasMany(models.Remark, {
//     foreignKey: 'companyId',
//     as: 'remarks'
//   });
// };
// Company.hasMany(AcademicYear, { foreignKey: 'companyId', as: 'academicYears' });
// InternCompany.hasMany(Remark, { foreignKey: 'companyId', as: 'remarks' });

module.exports = InternCompany;
