const DriveStatus = require('../models/driveStatusSchema'); // Adjust the path to your DriveStatus model
const IntershipStatus = require('../models/intership_status');

exports.submitAnswers = async (req, res) => {
  const { studentId, companyId, answers } = req.body;
        

  try {
    // Find or create the drive status record for the student and company
    const [driveStatus, created] = await DriveStatus.findOrCreate({
      where: { s_id: studentId, p_id: companyId },
      defaults: {
        s_id: studentId,
        p_id: companyId,
        que_answers: JSON.stringify(answers),
        round1 : 1
      }
    });

    if (!created) {
      // If the record already exists, update the que_responses field
      driveStatus.que_responses = JSON.stringify(answers);
      await driveStatus.save();
    }

    res.status(200).json({ message: 'Answers saved successfully!' });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.submitAnswersIntership = async (req, res) => {
  const { studentId, companyId, answers } = req.body;
        

  try {
    // Find or create the drive status record for the student and company
    const [driveStatus, created] = await IntershipStatus.findOrCreate({
      where: { s_id: studentId, p_id: companyId },
      defaults: {
        s_id: studentId,
        p_id: companyId,
        que_answers: JSON.stringify(answers),
        round1 : 1
      }
    });

    if (!created) {
      // If the record already exists, update the que_responses field
      driveStatus.que_responses = JSON.stringify(answers);
      await driveStatus.save();
    }

    res.status(200).json({ message: 'Answers saved successfully!' });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
};