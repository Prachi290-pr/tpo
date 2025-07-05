const bcrypt = require('bcrypt');
const connection = require('./path/to/db'); // Adjust the path accordingly
const asyncHandler = require('express-async-handler'); // If not installed, run `npm install express-async-handler`

const register = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  console.log("Reg Data:", req.body);

  const selectQuery = "SELECT * FROM student_details WHERE email_id = ?";
  connection.query(selectQuery, [email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);

    const insertQuery = "INSERT INTO student_details (email_id, pass) VALUES (?, ?)";
    connection.query(insertQuery, [email, hash], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created.");
    });
  });
});

module.exports = { register };
