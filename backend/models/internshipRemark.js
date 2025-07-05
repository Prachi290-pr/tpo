const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Company = require('../models/companySchema');
// require("../associations");

const IntershipRemark = sequelize.define('intership_remarks', {
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id'
        }
    },
    remark: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    drive_date : {
        type: DataTypes.DATE,
        allowNull: true,
    },
    reminder_date : {
        type: DataTypes.DATE,
        allowNull: true,
    }
},{
    timestamps: true
});

// / Remark.belongsTo(Company);
// Company.hasMany(Remark, { foreignKey: 'companyId' });
// Remark.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = IntershipRemark;