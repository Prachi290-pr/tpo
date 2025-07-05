const Company = require('../models/companySchema');
// const AcademicYear = require('../models/academicYearSchema');
const sequelize = require('../config/config');
const db = require('../config/dbConfig');
const InternCompany = require('../models/intershipCompany');

const createCompany = async (req, res) => {
  try {
    const { name, location, mode_of_communication, academic_year , turnover,onoff } = req.body;
    const company = await Company.create({ name, location, mode_of_communication, academic_year  , turnover,onoff });
    res.status(201).json({company, message: "Company Added Successfully"});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const IntershipcreateCompany = async (req, res) => {
  try {
    const { name, location, mode_of_communication, academic_year , turnover } = req.body;
    const company = await InternCompany.create({ name, location, mode_of_communication, academic_year  , turnover });
    res.status(201).json({company, message: "Company Added Successfully"});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll({
      order: [['name', 'ASC']], // Orders by the 'name' field in ascending order
    })
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const IntershipgetAllCompanies = async (req, res) => {
  try {
    const companies = await InternCompany.findAll();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { name, location, mode_of_communication, academic_year  , turnover} = req.body;

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    company.name = name || company.name;
    company.location = location || company.location;
    company.mode_of_communication = mode_of_communication || company.mode_of_communication;
    company.academic_year = academic_year || company.academic_year;
    company.turnover = turnover || company.turnover;

    await company.save();

    res.status(200).json({company, message: "Company Updated Successfully"});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const IntershipupdateCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { name, location, mode_of_communication, academic_year  , turnover} = req.body;

    const company = await InternCompany.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    company.name = name || company.name;
    company.location = location || company.location;
    company.mode_of_communication = mode_of_communication || company.mode_of_communication;
    company.academic_year = academic_year || company.academic_year;
    company.turnover = turnover || company.turnover;

    await company.save();

    res.status(200).json({company, message: "Company Updated Successfully"});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    await company.destroy();

    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const IntershipgetCompanyById = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAcademicYearsByCompanyName = async (req, res) => {
  try {
    const { companyName } = req.params;

    // Raw SQL query to fetch distinct academic years for a specific company name
    const query = `
      SELECT DISTINCT academic_year
      FROM companies
      WHERE name = :companyName
    `;

    const academicYears = await sequelize.query(query, {
      replacements: { companyName: companyName },
      type: sequelize.QueryTypes.SELECT,
    });

    const years = academicYears.map((yearObj) => yearObj.academic_year);

    res.status(200).json(years);
  } catch (err) {
    console.error('Error fetching academic years:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const IntershipgetAcademicYearsByCompanyName = async (req, res) => {
  try {
    const { companyName } = req.params;

    // Raw SQL query to fetch distinct academic years for a specific company name
    const query = `
      SELECT DISTINCT academic_year
      FROM intershiip_companies
      WHERE name = :companyName
    `;

    const academicYears = await sequelize.query(query, {
      replacements: { companyName: companyName },
      type: sequelize.QueryTypes.SELECT,
    });

    const years = academicYears.map((yearObj) => yearObj.academic_year);

    res.status(200).json(years);
  } catch (err) {
    console.error('Error fetching academic years:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const getCompaniesWithOldRemarks = async (req, res) => {
//   const query = `
//     SELECT c.id AS companyId, 
//      c.name, 
//      c.location, 
//      r.createdAt AS lastRemarkTime, 
//      r.status, 
//      r.remark
// FROM companies AS c
// LEFT JOIN (
//   SELECT r1.companyId, 
//          r1.createdAt, 
//          r1.status, 
//          r1.remark
//   FROM remarks AS r1
//   INNER JOIN (
//       SELECT companyId, 
//              MAX(createdAt) AS latestRemarkTime
//       FROM remarks
//       GROUP BY companyId
//   ) AS r2 ON r1.companyId = r2.companyId AND r1.createdAt = r2.latestRemarkTime
// ) AS r ON c.id = r.companyId
// WHERE r.createdAt <= DATE_SUB(CURDATE(), INTERVAL 7 DAY) OR r.createdAt IS NULL;
//   `;

//   try {
//     const [results] = await sequelize.query(query);
//     if (results.length === 0) {
//       return res.status(404).json({ error: "No companies found with remarks older than 7 days." });
//     }
//     console.log(`Reusls: ${results}`);
//     res.json(results);
//   } catch (error) {
//     console.error('Error in getCompaniesWithOldRemarks:', error);
//     res.status(500).json({ error: "Internal Server Error. Please try again later." });
//   }
// };

// // const testQuery = async (req, res) => {
// //   const q = `SELECT * FROM remarks`;
// //   try {
// //     // Query 1: SELECT 1 + 1 AS result
// //     // const query1 = `SELECT 1 + 1 AS result`;
// //     // const [results1] = await sequelize.query(query1);

// //     // // Query 2: SELECT * FROM companies
// //     // const query2 = `SELECT * FROM companies`;
// //     // const [results2] = await sequelize.query(query2);

// //     const results = await sequelize.query(q, {
// //       type: sequelize.QueryTypes.SELECT,
// //     });
// //     res.json({ results });
// //     // res.json({ result1: results1, result2: results2 });
// //   } catch (error) {
// //     console.error('Error in testQuery:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // };


// const testQuery = async (req, res) => {
//   const query = `SELECT * FROM remarks`;

//   try {
//     const results = await sequelize.query(query, {
//       type: sequelize.QueryTypes.SELECT,
//     });

//     res.status(200).json( results );
//   } catch (error) {
//     console.error('Error in testQuery:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

module.exports = {
  // testQuery,
  // getCompaniesWithOldRemarks,
  createCompany,
  deleteCompany,
  updateCompany,
  getAllCompanies,
  getCompanyById,
  getAcademicYearsByCompanyName,
  IntershipcreateCompany,
  IntershipgetAllCompanies,
  IntershipupdateCompany,
  IntershipgetAcademicYearsByCompanyName,
  IntershipgetCompanyById
}