// const { connection } = require("../../config/dbConfigEvent");
const connection = require("../../config/dbConfig");
const Admin = require("../../helpers/Admin");
const Event = require("../../helpers/Event");

//get all the registered students for a particular event (even not attended)
exports.getAllRegistrations = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const result = await Admin.getAllRegistrations(eventId);
    if (result.length === 0) {
      res.status(200).json({ message: "No registrations for this event yet" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//get only approved registrations
exports.getApprovedRegistrations = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const result = await Admin.getApprovedRegistrations(eventId);
    if (result.length === 0) {
      res
        .status(200)
        .json({ message: "No approved registrations for this event yet" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const result = await Admin.getAttendance(eventId);
    if (result.length === 0) {
      res.status(200).json({ message: "No attendance record" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//approve student for the event, whenever admin clicks
exports.approveStudent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { student_id } = req.body;
    console.log(req)
    console.log("sid: ",student_id," Event id: ",eventId);

    //check if the student is already approved
    const isApproved = await Admin.isApproved(eventId, student_id);
    if (!isApproved) {
      const result = await Admin.approveStudent(eventId, student_id);
      res.status(200).json({
        message: "Successfully approved student for the event",
        result,
      });
    } else {
      res.status(200).json({ message: "Student is already approved" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.markAsAttended = async (req, res) => {
  try {
    //---------------------- details fetched through json ----------------
    const { student_id, event_id } = req.body;

    //check if the student is already attended
    const isAttended = await Admin.isAttended(event_id, student_id);
    if (!isAttended) {
      const result = await Admin.markAsAttended(event_id, student_id);
      res.status(200).json({
        message: "Successfully marked student as attended for the event",
        result,
      });
    } else {
      res.status(200).json({ message: "Student has already attended" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.resetAllAttendance = async (req, res) => {
  try {
    const { event_id } = req.body;
    if (!event_id) {
      res.status(400).json({message: "Bad Request"})
      return
    }    

    // Reset all attendance for the event
    const result = await Admin.resetAllAttendance(event_id);

    if (result.affectedRows == 0){
      res.status(400).json({message: "No columns were affected", result})
      return;
    } 

    // Return success message
    res.status(200).json({
      message: "Successfully reset attendance for all students in the event",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { student_id } = req.body;
    const result = await Admin.deleteRegistration(eventId, student_id);
    res.status(200).json({ message: "Successfully deleted ", result: result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const data = await Admin.getAllAttendance();
    res.status(200).json({ result: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const eventId = req.params.eventId;
  
    const event = await Event.getAEvent(eventId);
    const status = [];
    let statusCode = 0; // Default status code
  
    if (event[0]) {
      status.push("Event is created")
      statusCode += 1
    }
    if (event[0].banner != null) {
      status.push("Banner is uploaded");
      statusCode += 1; // Increment statusCode by 1
    }
  
    if (event[0].signedLOA != null) {
      status.push("Signed LOA Uploaded");
      statusCode += 1; // Increment statusCode by 1
    }
  
    if (event[0].attendanceReport != null) {
      status.push("Attendance Report Uploaded");
      statusCode += 1; // Increment statusCode by 1
    }
  
    if (event[0].eventPhotos != null) {
      status.push("Event photos are uploaded");
      statusCode += 1; // Increment statusCode by 1
    }

  
    const isOnline = event[0].isOnline === 1;
    // console.log("Is the event online: ", isOnline);
  
    res.status(200).json({ status: statusCode, message: status.join(", "), isOnline: isOnline });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getStudentData = async (req, res) => {
  try {
    const student_id = req.params.student_id
    const student = await Admin.getStudentData(student_id)
    
    res.status(200).json({ message: "success",result: student})
  } catch (error) {
    res.status(400).json({ message: error.message });
    
  }
}

exports.getAllActiveEvents = async (req,res)=>{
  connection.query(`
    select * from tpo_events where eventDeadline>now();
    `,(error,data)=>{
      if(error){
        console.log(error);
        return res.status(400).json({ error: error.message });
      }
      else{
      return res.status(200).json({ message: "success",data: data})
      }
    })
}