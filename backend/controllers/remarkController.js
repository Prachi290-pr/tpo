const Remark = require('../models/remarkSchema');
const Company = require('../models/companySchema');
const sequelize = require('../config/config');
const asyncHand = require('express-async-handler');
const IntershipRemark = require('../models/internshipRemark');

const createRemark = async (req, res) => {
    try {
      console.log("Remark create data:",req.body);
        const { companyId } = req.params;
        const {status } = req.body;
        const {drive_date } = req.body;
        const {reminder_date } = req.body;
        const remark=req.body.text;
        console.log(drive_date);
        const newRemark = await Remark.create({ companyId, remark, status , drive_date, reminder_date});
        console.log("back new remark", newRemark)
        res.status(201).json(newRemark);
    } catch (error) {
      console.log("Remark Error:",error);
        res.status(400).json({ error: error.message });
    }
};

const IntershipcreateRemark = async (req, res) => {
  try {
    console.log("Remark create data:",req.body);
      const { companyId } = req.params;
      const {status } = req.body;
      const {drive_date } = req.body;
      const {reminder_date } = req.body;
      const remark=req.body.text;
      console.log(drive_date);
      const newRemark = await IntershipRemark.create({ companyId, remark, status , drive_date, reminder_date});
      console.log("back new remark", newRemark)
      res.status(201).json(newRemark);
  } catch (error) {
    console.log("Remark Error:",error);
      res.status(400).json({ error: error.message });
  }
};

const getAllRemarksForEachCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        const remarks = await Remark.findAll({ where: { companyId } });
        res.status(200).json(remarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const IntershipgetAllRemarksForEachCompany = async (req, res) => {
  try {
      const { companyId } = req.params;
      const remarks = await IntershipRemark.findAll({ where: { companyId } });
      res.status(200).json(remarks);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getAllRemarks = async (req, res) => {
    try {
        // const { companyId } = req.params;
        const remarks = await Remark.findAll();
        res.status(200).json(remarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllConfirmedRemarks = async (req, res) => {
    try {
        const remarks = await sequelize.query(
            // 'SELECT c.id, c.name FROM companies c LEFT JOIN remarks r ON c.id = r.companyId WHERE r.status = :status GROUP BY c.id HAVING COUNT(r.id) > 0',
            `SELECT c.id AS companyId, c.name AS companyName, r.id AS remarkId, c.location AS location, c.mode_of_communication AS mode_of_communication, c.academic_year AS academic_year, c.visited AS visited, r.drive_date
       FROM companies c
       JOIN (
           SELECT r.companyId, MAX(r.createdAt) as latestRemarkDate
           FROM remarks r
           WHERE r.status = :status
           GROUP BY r.companyId
       ) latestRemarks ON c.id = latestRemarks.companyId
       JOIN remarks r ON c.id = r.companyId AND r.createdAt = latestRemarks.latestRemarkDate
       WHERE r.status = :status`,
            {
                replacements: {status: 'Confirmed',},
                type: sequelize.QueryTypes.SELECT,
            });
        res.status(200).json(remarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const IntershipgetAllConfirmedRemarks = async (req, res) => {
  try {
      const remarks = await sequelize.query(
          // 'SELECT c.id, c.name FROM companies c LEFT JOIN remarks r ON c.id = r.companyId WHERE r.status = :status GROUP BY c.id HAVING COUNT(r.id) > 0',
          `SELECT c.id AS companyId, c.name AS companyName, r.id AS remarkId, c.location AS location, c.mode_of_communication AS mode_of_communication, c.academic_year AS academic_year, c.visited AS visited, r.drive_date
     FROM intershiip_companies c
     JOIN (
         SELECT r.companyId, MAX(r.createdAt) as latestRemarkDate
         FROM intership_remarks r
         WHERE r.status = :status
         GROUP BY r.companyId
     ) latestRemarks ON c.id = latestRemarks.companyId
     JOIN intership_remarks r ON c.id = r.companyId AND r.createdAt = latestRemarks.latestRemarkDate
     WHERE r.status = :status`,
          {
              replacements: {status: 'Confirmed',},
              type: sequelize.QueryTypes.SELECT,
          });
      res.status(200).json(remarks);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getRemark = async (req, res) => {
    try {
        const { companyId, remarkId } = req.params;
        const remark = await Remark.findOne({ where: { id: remarkId, companyId } });
        if (!remark) {
            return res.status(404).json({ error: 'Remark not found' });
        }
        res.status(200).json(remark);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const IntershipgetRemark = async (req, res) => {
  try {
      const { companyId, remarkId } = req.params;
      const remark = await IntershipRemark.findOne({ where: { id: remarkId, companyId } });
      if (!remark) {
          return res.status(404).json({ error: 'Remark not found' });
      }
      res.status(200).json(remark);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const updateRemark = async (req, res) => {
  try {
      const { remarkId } = req.params;
      const { remark } = req.body;
      const {text,status,drive_date,remark_date} = remark;
      const updatedRemark = await Remark.update(
          { remark:text,status:status,drive_date:drive_date,remark_date:remark_date },
          { where: { id: remarkId } }
      );
      if (!updatedRemark[0]) {
        console.log("Bro")
          return res.status(404).json({ error: 'Remark not found' });
      }
      res.status(200).json({ message: 'Remark updated successfully' });
  } catch (error) {
    console.log(error);
      res.status(500).json({ error: error.message });
  }
};

const IntershipupdateRemark = async (req, res) => {
  try {
      const { companyId, remarkId } = req.params;
      const { remark, status } = req.body;
      const updatedRemark = await IntershipRemark.update(
          { remark, status },
          { where: { id: remarkId, companyId } }
      );
      if (!updatedRemark[0]) {
          return res.status(404).json({ error: 'Remark not found' });
      }
      res.status(200).json({ message: 'Remark updated successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const deleteRemark = async (req, res) => {
    try {
        const { companyId, remarkId } = req.params;
        const deletedRows = await Remark.destroy({ where: { id: remarkId, companyId } });
        if (!deletedRows) {
            return res.status(404).json({ error: 'Remark not found' });
        }
        res.status(200).json({ message: 'Remark deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const IntershipdeleteRemark = async (req, res) => {
  try {
      const { companyId, remarkId } = req.params;
      const deletedRows = await Remark.destroy({ where: { id: remarkId, companyId } });
      if (!deletedRows) {
          return res.status(404).json({ error: 'Remark not found' });
      }
      res.status(200).json({ message: 'Remark deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getFlaggedRemarks = asyncHand(async (req, res) => {
    try {
      const query = 'SELECT * FROM v1';
      const [results] = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
      });
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
});

const updateFlaggedRemark = asyncHand(async (req, res) => {
    let { status, remark } = req.body;
    const { id } = req.params
    const remark_date = new Date().toISOString().split('T')[0];
  
    if (status === "Still Communication") {
      status = 1;
    } else if (status === "Confirmed") {
      status = 2;
    } else if (status === "HR") {
      status = 3;
    } else if (status === "Paused") {
      status = 4;
    }
  
    let statusId = parseInt(status);
    if (isNaN(statusId) || statusId < 1 || statusId > 4) {
      return res.status(400).json({ error: 'Status must be an integer between 1 and 4' });
    }
  
    const query = `
      UPDATE remarks
      SET status_id = ?, remark = ?, remark_date = ?
      WHERE id = ?
    `;
  
    try {
      const [result] = await sequelize.query(query, {
        replacements: [statusId, remark, remark_date, id],
        type: sequelize.QueryTypes.UPDATE
      });
  
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Remark updated successfully' });
      } else {
        res.status(404).json({ error: 'Remark not found' });
      }
    } catch (error) {
      console.error('Error updating remark:', error);
      res.status(500).json({ error: 'Error updating remark' });
    }
  });

  const testQuery = async (req, res) => {
    const query = `SELECT * FROM remarks`;
  
    try {
      const results = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });
  
      res.status(200).json( results );
    } catch (error) {
      console.error('Error in testQuery:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getCompaniesWithOldRemarks = async (req, res) => {
    const query = `
      SELECT c.id AS companyId, 
       c.name, 
       c.location, 
       r.createdAt AS lastRemarkTime, 
       r.status, 
       r.remark
  FROM companies AS c
  LEFT JOIN (
    SELECT r1.companyId, 
           r1.createdAt, 
           r1.status, 
           r1.remark
    FROM remarks AS r1
    INNER JOIN (
        SELECT companyId, 
               MAX(createdAt) AS latestRemarkTime
        FROM remarks
        GROUP BY companyId
    ) AS r2 ON r1.companyId = r2.companyId AND r1.createdAt = r2.latestRemarkTime
  ) AS r ON c.id = r.companyId
  WHERE r.createdAt <= DATE_SUB(CURDATE(), INTERVAL 7 DAY) OR r.createdAt IS NULL;
    `;
  
    try {
      const [results] = await sequelize.query(query);
      if (results.length === 0) {
        return res.status(404).json({ error: "No companies found with remarks older than 7 days." });
      }
    //   console.log(`Reusls: ${results}`);
      res.json(results);
    } catch (error) {
    //   console.error('Error in getCompaniesWithOldRemarks:', error);
      res.status(500).json({ error: "Internal Server Error. Please try again later." });
    }
  };


module.exports = {
    createRemark,
    getAllRemarksForEachCompany,
    getAllRemarks,
    getAllConfirmedRemarks,
    getRemark,
    updateRemark,
    deleteRemark,
    testQuery,
    getCompaniesWithOldRemarks,
    IntershipcreateRemark,
    IntershipgetAllRemarksForEachCompany,
    IntershipgetRemark,
    IntershipupdateRemark,
    IntershipdeleteRemark,
    IntershipgetAllConfirmedRemarks
    // getCompaniesWithOldRemarks,
    // testQuery,
    // getCompaniesWithOldRemarks,
    // getFlaggedRemarks,
    // updateFlaggedRemark,
    // getConfirmedCompanies,
    // fetchConfirmedCompanies,
};
