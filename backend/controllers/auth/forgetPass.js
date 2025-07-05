const bcrypt = require('bcrypt');
const connection = require('../../config/dbConfig'); // Ensure the correct path
const asyncHandler = require('express-async-handler'); // Ensure this is installed (`npm install express-async-handler`)

const forgetPass = asyncHandler(async (req, res) => {
  let clgId = req.body.clgId;
  let email = req.body.email;
  const newPassword = req.body.newPassword;
  if(email=='' || email==undefined || email==null || email=='undefined')
  {
    email=null
  }
  if(clgId=='' || clgId==undefined || clgId==null || clgId=='undefined')
  {
    clgId=null
  }
  console.log(clgId);
  // Check if both email and newPassword are provided
  if (!email || !newPassword) {
    return res.status(400).json("Email and password are required.");
  }

//   console.log("Error")

  const selectQuery = "SELECT * FROM student_details WHERE email_id = coalesce(?,email_id) or clg_id = coalesce(?,clg_id)";
  connection.query(selectQuery, [email,clgId], (err, data) => {
    if (err) {console.log(err); return res.status(500).json(err);}
    console.log(data.length)
    if (data.length == 0) return res.status(404).json("User does not exist!");
    if (data.length > 1) return res.status(404).json("User does not exist!");

    console.log(data);
    // Generate salt and hash the new password
    const salt = bcrypt.genSaltSync(10);  // Generate a salt with 10 rounds
    const hash = bcrypt.hashSync(newPassword, salt);  // Hash the password with the salt

    // console.log("Error");


    const updateQuery = "UPDATE student_details SET pass = ?, email_id = coalesce(?,email_id), clg_id = coalesce(?,clg_id) WHERE email_id = coalesce(?,email_id) or clg_id = coalesce(?,clg_id)";
    connection.query(updateQuery, [hash, email,clgId,email,clgId], (err, result) => {
      if (err) {console.log(err); return res.status(500).json(err);}
      return res.status(200).json({msg:"User password has been updated.",success: true});
    });
  });
});


module.exports = { forgetPass };
