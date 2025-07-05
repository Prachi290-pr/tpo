const expressAsyncHandler = require("express-async-handler");
const db = require('../config/dbConfig');

const formatDate = (date) => {
  let d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();
  let hour = "" + d.getHours();
  let minute = "" + d.getMinutes();
  let second = "" + d.getSeconds();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hour.length < 2) hour = "0" + hour;
  if (minute.length < 2) minute = "0" + minute;
  if (second.length < 2) second = "0" + second;

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

const all_job_posting_user = (req, res) => {
  const sid = req.params.sid;
  const sql = `select j.id,c.name as company_name,j.job_description from drive_status as d inner join job_postings as j on d.p_id=j.id inner join companies as c on j.companyId=c.id where d.s_id=?;`;
  db.query(sql, [sid], (err, results) => {
    if (err) {
      console.error("Error retrieving data from database:", err);
      res.status(500).json({ message: "Error retrieving data from database" });
    } else {
      res.status(200).json(results);
    }
  });
};

const all_job_posting_userInter = (req, res) => {
  const sid = req.params.sid;
  const sql = `select j.id,c.name as company_name,j.job_description from intership_status as d inner join intership_postings as j on d.p_id=j.id inner join intershiip_companies as c on j.companyId=c.id where d.s_id=?;`;
  db.query(sql, [sid], (err, results) => {
    if (err) {
      console.error("Error retrieving data from database:", err);
      res.status(500).json({ message: "Error retrieving data from database" });
    } else {
      res.status(200).json(results);
    }
  });
};

const getallchats = expressAsyncHandler(async (req, res) => {
  const { jobCompanyId } = req.params;

  const sql = `SELECT c.id, c.job_company_id,c.isadmin, c.user_id, c.message, CONCAT(s.first_name, ' ', s.last_name) as fullname, c.timestamp
    FROM chats AS c
    INNER JOIN student_details AS s ON c.user_id = s.id
    WHERE c.job_company_id = ?`;

  db.query(sql, [jobCompanyId], (err, results) => {
    if (err) {
      console.error("Error fetching chats:", err);
      res.status(500).send("Server error");
      return;
    }
    res.json(results);
  });
});

const getallchatsInter = expressAsyncHandler(async (req, res) => {
  const { jobCompanyId } = req.params;

  const sql = `SELECT c.id, c.job_company_id,c.isadmin, c.user_id, c.message, CONCAT(s.first_name, ' ', s.last_name) as fullname, c.timestamp
    FROM intership_chats AS c
    INNER JOIN student_details AS s ON c.user_id = s.id
    WHERE c.job_company_id = ?`;

  db.query(sql, [jobCompanyId], (err, results) => {
    if (err) {
      console.error("Error fetching chats:", err);
      res.status(500).send("Server error");
      return;
    }
    res.json(results);
  });
});

const insertchats = expressAsyncHandler(async (req, res) => {
  const { jobCompanyId, userId, message, timestamp } = req.body;

  // Log the request body to check the data being sent
  console.log('Request body:', req.body);

  if (!jobCompanyId || !userId || !message || !timestamp) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const formattedTimestamp = formatDate(timestamp);

  const sql = "INSERT INTO chats (job_company_id, user_id, message, timestamp) VALUES (?, ?, ?, ?)";

  db.query(sql, [jobCompanyId, userId, message, formattedTimestamp], (err, result) => {
    if (err) {
      // Log the error
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({
      id: result.insertId,
      jobCompanyId,
      userId,
      message,
      timestamp: formattedTimestamp,
    });
  });
});

const insertchatsInter = expressAsyncHandler(async (req, res) => {
  const { jobCompanyId, userId, message, timestamp } = req.body;

  // Log the request body to check the data being sent
  console.log('Request body:', req.body);

  if (!jobCompanyId || !userId || !message || !timestamp) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const formattedTimestamp = formatDate(timestamp);

  const sql = "INSERT INTO intership_chats (job_company_id, user_id, message, timestamp) VALUES (?, ?, ?, ?)";

  db.query(sql, [jobCompanyId, userId, message, formattedTimestamp], (err, result) => {
    if (err) {
      // Log the error
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    return res.json({
      id: result.insertId,
      jobCompanyId,
      userId,
      message,
      timestamp: formattedTimestamp,
    });
    // res.end();   
  });
});

const getalljobpost = (req, res) => {
  const query = `select j.id, c.name, c.location , j.job_description,j.package_details,j.roles,j.company_type,j.createdAt from companies as c inner join job_postings as j on  j.companyId =c.id order by j.id desc`;
  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
};

const getallIntershipPost = (req, res) => {
  const query = `select j.id, c.name, c.location , j.job_description,j.package_details,j.roles,j.createdAt from intershiip_companies as c inner join intership_postings as j on  j.companyId =c.id order by j.id desc`;
  db.query(query, (error, results) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
};

const insertadminchats = expressAsyncHandler(async (req, res) => {
  const { jobCompanyId, userId, message, timestamp } = req.body;
  const formattedTimestamp = formatDate(timestamp);
  const usertype = "2";
  const sql =
    "INSERT INTO chats (job_company_id, user_id, message, timestamp,isadmin) VALUES (?, ?, ?, ?,?)";

  db.query(
    sql,
    [jobCompanyId, userId, message, formattedTimestamp, usertype],
    (err, result) => {
      if (err) throw err;
      res.json({
        id: result.insertId,
        jobCompanyId,
        userId,
        message,
        timestamp: formattedTimestamp,
      });
    }
  );
});

const insertadminchatsinter = expressAsyncHandler(async (req, res) => {
  const { jobCompanyId, userId, message, timestamp } = req.body;
  const formattedTimestamp = formatDate(timestamp);
  const usertype = "2";
  const sql =
    "INSERT INTO intership_chats (job_company_id, user_id, message, timestamp,isadmin) VALUES (?, ?, ?, ?,?)";

  db.query(
    sql,
    [jobCompanyId, userId, message, formattedTimestamp, usertype],
    (err, result) => {
      if (err) throw err;
      res.json({
        id: result.insertId,
        jobCompanyId,
        userId,
        message,
        timestamp: formattedTimestamp,
      });
    }
  );
});

module.exports = {
  all_job_posting_user,
  getallchats,
  insertchats,
  getalljobpost,
  insertadminchats,
  getallIntershipPost,
  getallchatsInter,
  insertadminchatsinter,
  all_job_posting_userInter,
  insertchatsInter
};
