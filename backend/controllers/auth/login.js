const connection = require('../../config/dbConfig'); // Adjust the path accordingly
const asyncHandler = require('express-async-handler'); // If not installed, run `npm install express-async-handler`

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.DB_SECRET_KEY;
console.log("SecretKey for signing token:", secretKey);

const login = asyncHandler((req, res) => {
  console.log("User Data is here: ", req.body);

  let { email, password } = req.body;
  email = email.trim();

  const searchQuery = "SELECT * FROM student_details WHERE email_id = ?";

  const additionalQuery = `
    SELECT * FROM student_details WHERE email_id = (?) AND (
             first_name IS NULL OR
             middle_name IS NULL OR
             last_name IS NULL OR
             clg_id IS NULL OR
             mobile IS NULL OR
             gender IS NULL OR
             dob IS NULL OR
             branch IS NULL OR
             degree IS NULL OR
             loc IS NULL  OR
             ssc_per IS NULL OR
             ssc_year IS NULL OR
             degree_per IS NULL OR
             degree_cgpa IS NULL OR
             degree_year IS NULL OR
             resume IS NULL OR
             interested_in IS NULL OR
             ((diploma_year IS NULL AND degree_per IS  NULL) OR
             (hsc_per IS NOT NULL AND hsc_year IS  NULL)) );
  `;

  try {
    connection.query(searchQuery, [email], async (err, results) => {
      console.log("results:", results);
      if (err) {
        console.error("Error running the query: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials", reason: "username or password incorrect" });
      } else {
        const user = results[0];
        console.log("User data: ", user);

        const passwordMatch = await bcrypt.compare(password, user.pass);

        if (!passwordMatch) {
          return res.status(401).json({ message: "Invalid credentials", reason: "username or password incorrect" });
        }

        // Execute additional query
        connection.query(additionalQuery, [email], async (err, additionalResult) => {
          if (err) {
            console.error("Error running the additional query: ", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          console.log("Status: ", additionalResult);
          let additionalVariable = additionalResult.length > 0 ? 0 : 1;

          const tokenPayload = {
            uid: user.id,
            status: additionalVariable,
            user_type: user.usertype
          };

          console.log("Data for JWT: ", tokenPayload);

          const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "30d" });

          res.status(200).json({
            message: "Logged in successfully",
            token: token,
            uid: user.id,
            status: additionalVariable,
            user_type: user.usertype
          });
        });
      }
    });
  } catch (error) {
    console.error("Error running the query: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  login
};
