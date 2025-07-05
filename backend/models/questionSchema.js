const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const JobPostings = require('./jobPostingSchema');
const Remark = require('./remarkSchema');

const Questions = sequelize.define('questions', {
    question: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    data_type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "text",
    },
    response: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    remarkId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'remarks',
            key: 'id',
        },
        allowNull: true,
    },
    // companyId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: 'companies',
    //         key: 'id',
    //     },
    //     allowNull: false,
    // },
    // remarkId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: "remarks",
    //         key: "id",
    //     },
    //     allowNull: false,
    // },
    companyId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'job_postings',
            key: 'id',
        },
    }
}, {
    timestamps: true,
});

module.exports = Questions;