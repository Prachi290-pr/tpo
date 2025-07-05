const connection = require('../../config/dbConfig'); // Ensure the correct path
const asyncHandler = require('express-async-handler'); // Ensure this is installed (`npm install express-async-handler`)

const toggleRegistrationStatus = asyncHandler(async (req, res) => {

  const updateQuery = "UPDATE registration_status SET val = (not val)";
  connection.query(updateQuery, (err, result) => {
    if (err) {console.log(err); return res.status(500).json(err);}
    // if (result.affectedRows === 0) return res.status(404).json("User not found.");
    // console.log(result)
    return res.status(200).json({});
  });
});

const getRegistartionStatus = asyncHandler(async (req, res) => {

    const updateQuery = "select val from registration_status";
    connection.query(updateQuery, (err, result) => {
      if (err) {console.log(err); return res.status(500).json(err);}
      // if (result.affectedRows === 0) return res.status(404).json("User not found.");

    //   console.log(result);
      return res.status(200).json({val:result[0].val});
    });
  });

module.exports = { toggleRegistrationStatus,getRegistartionStatus };
