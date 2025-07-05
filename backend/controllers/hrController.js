const asyncHand = require("express-async-handler");
const sequelize = require('../config/config');
const connection = require("../config/dbConfig");

const getHrsByCompanyId = asyncHand(async (req, res) => {
    console.log("Params received: ", req.params);

    const cID = req.params.companyId;

    try {
        
        const getCompanyIdQuery = `
        SELECT id, name FROM companies WHERE id = ?;
        `;

        const [companyResults] = await sequelize.query(getCompanyIdQuery, {
            replacements: [cID],
            type: sequelize.QueryTypes.SELECT
        });

        if (companyResults.length === 0) {
            return res.status(404).json({ error: "Company not found" });
        }

        const companyId = companyResults.id;

        const getHrQuery = `
        SELECT * FROM hr WHERE company_id = ?;
        `;

        const hrResults = await sequelize.query(getHrQuery, {
            replacements: [companyId],
            type: sequelize.QueryTypes.SELECT
        });

        console.log(hrResults);
        res.json(hrResults);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});


const getHrsByCompanyAll = asyncHand(async (req, res) => {
  try {
      
      const getHrQuery = `
      select 
          group_concat(hr.name) as name,
          group_concat(hr.email) as email,
          group_concat(hr.contact) as contact,
          group_concat(hr.alternate_contact) as alternate_contact,
          c.name as cname 
      from hr left join companies as c on hr.company_id = c.id
      group by c.name;
      `;

      connection.query(getHrQuery,(err,data)=>{
        if(err) console.log(err);
        else{
          res.status(200).json({data:data})
        }
      })
 
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
  }
});

const AddHrs = asyncHand(async (req, res) => {
    console.log("Data: ", req.body);

    const { HRName, HREmail, HRContact, HRAlternate, HRPost } = req.body;
    const companyName = req.body.companyid;

    try {
        // Query to get company_id from company_info table using company_name
        // const getCompanyIdQuery = `
        // SELECT id FROM companies WHERE id = ?;
        // `;

        // const companyResults = await sequelize.query(getCompanyIdQuery, {
        //     replacements: [companyName],
        //     type: sequelize.QueryTypes.SELECT
        // });

        // if (companyResults.length === 0) {
        //     return res.status(404).json({ error: "Company not found" });
        // }

        // const companyId = companyResults.id;
        console.log(companyName);

        // Query to insert HR details into hr table
        const insertHRQuery = `
        INSERT INTO hr (name, email, contact, alternate_contact, post, company_id)
        VALUES (?, ?, ?, ?, ?, ?);
        `;

        const [insertResults] = await sequelize.query(insertHRQuery, {
            replacements: [HRName, HREmail, HRContact, HRAlternate, HRPost, companyName],
            type: sequelize.QueryTypes.INSERT
        });

        console.log(insertResults);
        res.json({ message: 'HR added successfully!', insertId: insertResults });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

const updateHr = async (req, res) => {
    const hrid = req.params.hrid;
  
    console.log("Data for updation: ", req.body, "HR ID:", hrid);
    const { HRName, HREmail, HRContact, HRAlternate, HRPost } = req.body;
  
    try {
      let setClause = [];
      if (HRName) setClause.push(`name = ?`);
      if (HREmail) setClause.push(`email = ?`);
      if (HRContact) setClause.push(`contact = ?`);
      if (HRPost) setClause.push(`post = ?`);
      if (HRAlternate) setClause.push(`alternate_contact = ?`);
  
      const query = `UPDATE hr SET ${setClause.join(', ')} WHERE id = ?`;
  
      const [results] = await sequelize.query(query, {
        replacements: [HRName, HREmail, HRContact, HRPost, HRAlternate, hrid].filter(Boolean),
        type: sequelize.QueryTypes.UPDATE,
      });
  
      console.log(req.body, "data updated successfully");
      res.send({ message: 'HR edited successfully!', results });
    } catch (error) {
      console.error("Error updating HR:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const deleteHr = async (req, res) => {
    const hrid = req.params.id;
    console.log(hrid);
  
    try {
      await sequelize.query(`DELETE FROM hr WHERE id = ?`, {
        replacements: [hrid],
        type: sequelize.QueryTypes.DELETE,
      });
  
      res.send({ message: 'HR deleted successfully!' });
    } catch (error) {
      console.error("Error deleting HR:", error);
      res.status(500).json({ error: error.message });
    }
  };

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

module.exports = {
    getHrsByCompanyId,
    AddHrs,
    updateHr,
    deleteHr,
    testQuery,
    getHrsByCompanyAll
};
