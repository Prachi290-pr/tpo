const Event = require("../../helpers/Event");
const path = require("path");
const fs = require("fs");
const loaController = require("./loaController");
const noticeController = require("./noticeController");

const multer = require('multer');
// const path = require('path');

exports.downloadEventDoc = (req, res) => {
  console.log("called");
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../../public/assets/files", fileName);
  console.log(filePath);
  res.download(filePath);
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = 'other';
    if (file.fieldname === 'banner') folder = 'banner';
    if (file.fieldname === 'paymentQR') folder = 'PaymentQR';
    cb(null, path.join(__dirname, '../../public/assets/', folder));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

exports.createEvent = [
  upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'paymentQR', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      console.log("called");
      let { eventName, eventDescription, nameOfSpeaker, organizationOfSpeaker, locationOfSpeaker, date, category, time, department, eligible_degree_year, isPaid, cost, isOnline, eventLink, eventNotice, eventDeadline } = req.body;
      
      console.log(eventDeadline);
      let banner = req.files['banner'] ? 'assets/banner/' + req.files['banner'][0].filename : null;
      let paymentQR = req.files['paymentQR'] ? 'assets/PaymentQR/' + req.files['paymentQR'][0].filename : null;
      req.body.banner = banner;
      req.body.paymentQR = paymentQR;

      isOnline = isOnline === 'true';
      if (!isOnline && eventLink !== null) {
        eventLink = null;
      }

      // Generate event notice PDF if provided
      if (eventNotice && eventNotice.trim() !== '') {
        const noticeData = { date, eventName, eventNotice };
        const isNoticeGenerated = await noticeController.createPDF(noticeData);
        req.body.notice = isNoticeGenerated ? isNoticeGenerated : null;
      }

      // Generate LOA PDF for the speaker
      const loaData = {
        date,
        recipientName: nameOfSpeaker,
        recipientOrganization: organizationOfSpeaker,
        recipientLocation: locationOfSpeaker,
        subject: eventName,
        activity: eventDescription,
        serverUrl: process.env.NODE_APP_URL,
      };

      const isGenerated = await loaController.createPDF(loaData);
      req.body.loaOfSpeaker = isGenerated ? isGenerated : null;

      const currentBatch = await Event.getCurrentBatch();
      const result = await Event.createEvent(
        eventName, eventDescription, nameOfSpeaker, organizationOfSpeaker, locationOfSpeaker,
        date, category, time, department, eligible_degree_year, currentBatch,
        isPaid, cost, isOnline, eventLink, paymentQR, banner, req.body.loaOfSpeaker,
        req.body.notice, eventDeadline
      );

      res.status(201).json({ message: 'Event created successfully', result });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
];


//get all events whose deadline is not met
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.getAllEvents();
    if (events.length === 0) {
      res.status(200).json({ message: "No Events yet" });
    } else {
      // const eventPromises = events.map(async (event) => {
      //   const isDead = await Event.handleDeadline(event.eventDeadline);
      //   if (isDead) {
      //     // console.log(event.eventName, ": has met the deadline, removing event")
      //     //make isDeadlineMet = true here:
      //     const isSet = await Event.changeDeadStatus(event.eventId, true)
      //     await removeEventById(event.eventId); //removes the event
      //     //make default 3000
      //     const makeDefault = Event.makeDefault(event.eventId)
      //   } else {
      //     // console.log(event.eventId, ": has not met the deadline, moving on")
      //     const isSet = await Event.changeDeadStatus(event.eventId, false)
      //   }
      // })

      res.status(200).json(events);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId
    const events = await Event.getAEvent(eventId);
    if (events.length === 0) {
      res.status(200).json({ message: "No Events found" });
    } else {
      res.status(200).json(events);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//get all events
exports.getEventHistory = async (req, res) => {
  try {
    const events = await Event.getEventHistory();
    if (events.length === 0) {
      res.status(200).json({ message: "No Events yet" });
    } else {
      res.status(200).json(events);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all events
exports.getDeadEvents = async (req, res) => {
  try {
    const events = await Event.getDeadEvents();
    if (events.length === 0) {
      res.status(200).json({ message: "No Dead Events yet" });
    } else {
      res.status(200).json(events);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get user's eligible events only:
exports.getEligibleEvents = async (req, res) => {
  try {
    const student_id = req.params.student_id;
    console.log(student_id)
    const result = await Event.getEligibleEvents(student_id);

    if (result.length > 0) {
      res.status(200).json({ result: result });
    } else {
      res.status(200).json({ result: result });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  // Run multer upload dynamically inside the function
  upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'paymentQR', maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed', details: err.message });
    }

    try {
      const id = req.params.eventId;
      const event = await Event.getAEvent(id);
      const loa = event[0].loaOfSpeaker;
      const eNotice = event[0].notice;
      const prevQR = event[0].paymentQR;

      // Banner Upload
      if (req.files && req.files['banner']) {
        const bannerFile = req.files['banner'][0];
        req.body.banner = 'assets/banner/' + bannerFile.filename;

        // Delete previous banner
        if (event[0].banner) {
          const prevPath = path.join(__dirname, '../../public', event[0].banner);
          try{
            fs.unlink(prevPath, (err) => {
              if (err) console.error('Error deleting previous banner:', err);
            });
          }catch(err){
            console.log("Already Deleted");
          }
          
        }
      } else {
        req.body.banner = event[0].banner;
      }

      // Payment QR Upload
      if (req.files && req.files['paymentQR']) {
        const qrFile = req.files['paymentQR'][0];
        req.body.paymentQR = 'assets/PaymentQR/' + qrFile.filename;

        // Delete previous QR
        if (prevQR) {
          const prevPath = path.join(__dirname, '../../public', prevQR);
          try{
            fs.unlink(prevPath, (err) => {
              if (err) console.error('Error deleting previous QR:', err);
            });
          }catch(err){
            console.log("Already Deleted");
          }
          
        }
      } else {
        req.body.paymentQR = prevQR;
      }

      // Notice Generation
      if (req.body.eventNotice && req.body.eventNotice.trim() !== '') {
        if (eNotice) {
          const prevPath = path.join(__dirname, '../../public', eNotice);
          try{
            fs.unlink(prevPath, (err) => {
              if (err) console.error('Error deleting previous notice:', err);
            });
          }
          catch(err){
            console.log("Already Deleted");
          }
         
        }

        const noticeData = {
          date: req.body.date,
          eventName: req.body.eventName,
          eventNotice: req.body.eventNotice,
          serverUrl: process.env.NODE_APP_URL,
        };

        const isNoticeGenerated = await noticeController.createPDF(noticeData);
        req.body.notice = isNoticeGenerated || null;
      } else {
        req.body.notice = eNotice;
      }

      // LoA Generation
      if (loa) {
        const prevPath = path.join(__dirname, '../../public/', loa);
        try{
          fs.unlink(prevPath, (err) => {
            if (err) console.error('Error deleting previous LoA:', err);
          });
        }catch(err){
          console.log("Already Deleted");
        }
        
      }

      const loaData = {
        date: req.body.date,
        recipientName: req.body.nameOfSpeaker,
        recipientOrganization: req.body.organizationOfSpeaker,
        recipientLocation: req.body.locationOfSpeaker,
        subject: req.body.eventName,
        activity: req.body.eventDescription,
      };

      const isGenerated = await loaController.createPDF(loaData);
      req.body.loaOfSpeaker = isGenerated || null;

      // Update Event in DB
      const result = await Event.updateEvent(
        id,
        req.body.eventName,
        req.body.eventDescription,
        req.body.nameOfSpeaker,
        req.body.organizationOfSpeaker,
        req.body.locationOfSpeaker,
        req.body.date,
        req.body.category,
        req.body.time,
        req.body.department,
        req.body.eligible_degree_year,
        req.body.isPaid === 'true',
        req.body.cost=='null'? null : req.body.cost,
        req.body.isOnline === 'true',
        req.body.eventLink,
        req.body.paymentQR,
        req.body.banner,
        req.body.loaOfSpeaker,
        req.body.notice,
        req.body.eventDeadline
      );

      res.status(200).json({ message: 'Event updated successfully', result });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  });
};

//this controller flags the event as deleted, to not show in the admin UI, and removing the banner in the process for reducing server load
// Helper function to remove an event by ID
const removeEventById = async (eventId) => {
  try {
    const event = await Event.getAEvent(eventId);
    const prevNotice = event[0].notice;

    // Deleting the previous notice:
    if (prevNotice) {
      // console.log("Deleting Previous notice: ", prevNotice);
      const prevPath = path.join(__dirname, "../public", prevNotice);
      fs.unlink(prevPath, (err) => {
        if (err) {
          // console.error("Error deleting the notice:", err);
        } else {
          // console.log("Notice deleted successfully!");
        }
      });
    } else {
      // console.log("No previous notice to delete");
    }

    // Remove the notice from the event
    await Event.deleteNotice(eventId);

    // Deleting the banner file:
    const prevFile = event[0].banner;
    if (prevFile) {
      // console.log("Deleting Previous file: ", prevFile);
      const prevPath = path.join(__dirname, "../public", prevFile);
      fs.unlink(prevPath, (err) => {
        if (err) {
          // console.error("Error deleting the file:", err);
        } else {
          // console.log("File deleted successfully!");
        }
      });
      await Event.deleteBanner(eventId);
    }

    // Flag the event as deleted
    const result = await Event.flagEventAsDeleted(eventId);
    // console.log("Event removed successfully, result:", result);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Original removeEvent function (now simplified)
exports.removeEvent = async (req, res) => {
  try {
    const id = req.params.eventId;
    await removeEventById(id);
    res.status(200).json({
      message: "Event removed successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.undoEvent = async (req, res) => {
  try {
    const id = req.params.eventId;

    const result = await Event.flagEventAsNotDeleted(id);
    // const isSet = await Event.changeDeadStatus(id, false)

    //make the deadline default to 3000
    await Event.makeDefault(id);

    res
      .status(200)
      .json({ message: "Successful undo of event details", result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//this deletes the whole event, its related registration records, the attendance and the banner
exports.deleteEvent = async (req, res) => {
  try {
    const id = req.params.eventId;

    //deleting the previous file

    //getting the previous filename from the db if present
    const event = await Event.getAEvent(id);
    const prevFile = event[0].banner;
    const loa = event[0].loaOfSpeaker;
    const sLOA = event[0].signedLOA;
    const aR = event[0].attendanceReport; 
    if (prevFile) {
      // checks if the previous file is present to perform the deletion
      // console.log("Deleting Previous file: ", prevFile);

      const prevPath = path.join(__dirname, "../public", prevFile);
      // console.log(prevPath)

      // ------------------------ Cautious code begins ---------------------------------------
      fs.unlink(prevPath, (err) => {
        if (err) {
          // console.error("Error deleting the file:", err);
        } else {
          // console.log("File deleted successfully!");
        }
      });
      // ------------------------ Cautious code ends ---------------------------------------

      //make the banner null here
      const result = await Event.deleteBanner(id);
    } else {
      // console.log("No previous banner to delete");
    }

    //if loa is present previously, delete it
    if (loa) {
      // console.log("Deleting Previous loa: ", loa);

      const prevPath = path.join(__dirname, "../public", loa);

      // ------------------------ Cautious code begins ---------------------------------------
      fs.unlink(prevPath, (err) => {
        if (err) {
          // console.error("Error deleting the loa:", err);
        } else {
          // console.log("loa deleted successfully!");
        }
      });
      // ------------------------ Cautious code ends ---------------------------------------
    } else {
      // console.log("there was no loa to delete");
    }

    //delete notice

    const prevNotice = event[0].notice;
    if (prevNotice) {
      // checks if the previous file is present to perform the deletion
      // console.log("Deleting Previous notice: ", prevNotice);

      const prevPath = path.join(__dirname, "../public", prevNotice);
      // console.log(prevPath)

      // ------------------------ Cautious code begins ---------------------------------------
      fs.unlink(prevPath, (err) => {
        if (err) {
          // console.error("Error deleting the file:", err);
        } else {
          // console.log("File deleted successfully!");
        }
      });
      // ------------------------ Cautious code ends ---------------------------------------
      const result = await Event.deleteNotice(id);
    } else {
      // console.log("No previous notice to delete");
    }

    //delete the signed loa if present:
    if (sLOA){
      const prevPath = path.join(__dirname, "../public", "assets", "files", sLOA);
      // console.log(prevPath)

      // ------------------------ Cautious code begins ---------------------------------------
      fs.unlink(prevPath, (err) => {
        if (err) {
          console.log("Error deleting the file:", err);
        } else {
          console.log("File deleted successfully!");
        }
      });
      // ------------------------ Cautious code ends ---------------------------------------
      const result = await Event.deleteSLOA(id);

    } else {

    }

    //delete the attendance report as well:
    if (aR){
      const prevPath = path.join(__dirname, "../public", "assets", "files", aR);
      // console.log(prevPath)

      // ------------------------ Cautious code begins ---------------------------------------
      fs.unlink(prevPath, (err) => {
        if (err) {
          console.log("Error deleting the file:", err);
        } else {
          console.log("File deleted successfully!");
        }
      });
      // ------------------------ Cautious code ends ---------------------------------------
      const result = await Event.deleteAR(id);

    } else {

    }

    const result = await Event.deleteEvent(id);

    //deleting the event photos if they exist
    const prevZipFile = await event[0].eventPhotos;

    if (prevZipFile) {
      //previous file exists, delete it
      // console.log("Deleting Previous file: ", prevZipFile);
      const prevPath = path.join(__dirname, "../public", prevZipFile);
      fs.unlink(prevPath, (err) => {
        if (err) {
          // console.error("Error deleting previous event photos:", err);
        } else {
          // console.log("Previous photos deleted successfully!");
        }
      });
    } else {
      // console.log("No previous photos to delete")
    }

    res.status(200).json({ message: "Event Deleted Successfully", result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const storagePhoto = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/assets/files'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadPhot = multer({ storage: storagePhoto }).single('photos');

//upload event photos:
exports.uploadEventPhotos = (req, res) => {
  uploadPhot(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error uploading file', error: err });
    }

    try {
      const eventId = req.params.eventId;
      const event = await Event.getAEvent(eventId);
      const prevFile = event[0]?.eventPhotos;

      if (prevFile) {
        const prevPath = path.join(__dirname, '../../public/assets/files', prevFile);
        fs.unlink(prevPath, (err) => {
          if (err) {
            console.error('Error deleting previous event photos:', err);
          }
        });
      }

      if (req.file) {
        req.body.photos = req.file.filename;
        const result = await Event.storePhoto(eventId, req.body.photos);
        await Event.changePhotosUploadStatus(eventId);
        res.status(200).json({
          message: 'Successfully stored the event photos',
          result: result
        });
      } else {
        res.status(400).json({ message: 'No file received' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

//delete eventPhotos:
exports.deleteEventPhotos = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const event = await Event.getAEvent(eventId);
    const prevFile = await event[0].eventPhotos;

    if (prevFile) {
      //previous file exists, delete it
      // console.log("Deleting Previous file: ", prevFile);
      const prevPath = path.join(__dirname, "../../public", "assets", "files", prevFile);
      fs.unlink(prevPath, (err) => {
        if (err) {
          console.log("Error deleting previous event photos:", err);
          res.status(500).json({message: "Error deleting previous event photos:", error: err})

        } else {
          console.log("Previous event photos deleted successfully!");
          res.status(200).json({message: "Previous Event photos deleted successfully!"})
        }
      });
      
      await Event.deleteEventPhotos(eventId) 
    } else {
      console.log("No previous event photos to delete");
      res.status(200).json({message: "No previous event photos to delete"})

    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const storageSLOA = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/assets/files'));
  },
  filename: function (req, file, cb) {
    const fileName = 'sLOA' + new Date().getTime().toString() + '-' + file.originalname;
    cb(null, fileName);
  },
});

const uploadSLOA = multer({ storage: storageSLOA }).single('signedLOA');

//upload signedLOA:
exports.uploadSignedLOA = async (req, res) => {
  uploadSLOA(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'File upload failed', error: err.message });
    }

    try {
      const eventId = req.params.eventId;

      // Check if previous file exists
      const event = await Event.getAEvent(eventId);
      const prevFile = event[0]?.signedLOA;

      if (prevFile) {
        const prevPath = path.join(__dirname, '../../public/assets/files', prevFile);
        fs.unlink(prevPath, (err) => {
          if (err) {
            console.error('Error deleting previous Signed LOA:', err);
          } else {
            console.log('Previous Signed LOA deleted successfully!');
          }
        });
      } else {
        console.log('No previous signed LOA to delete');
      }

      if (req.file) {
        const fileName = req.file.filename;
        req.body.signedLOA = fileName;

        await Event.storeSignedLOA(eventId, fileName);
        res.status(200).json({ message: 'Successfully stored signed LOA' });
      } else {
        res.status(400).json({ message: 'No file received' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

exports.deleteSignedLOA = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const event = await Event.getAEvent(eventId);
    const prevFile = await event[0].signedLOA;

    if (prevFile) {
      //previous file exists, delete it
      // console.log("Deleting Previous file: ", prevFile);
      const prevPath = path.join(__dirname, "../../public", "assets", "files", prevFile);
      fs.unlink(prevPath, (err) => {
        if (err) {
          console.log("Error deleting previous Signed LOA:", err);
          res.status(500).json({message: "Error deleting previous Signed LOA:", error: err})

        } else {
          console.log("Previous Signed LOA deleted successfully!");
          res.status(200).json({message: "Previous Signed LOA deleted successfully!"})
        }
      });
      
      await Event.deleteSLOA(eventId) 
    } else {
      console.log("No previous signed LOA to delete");
      res.status(200).json({message: "No previous signed LOA to delete"})

    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const storageAR = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/assets/files'));
  },
  filename: function (req, file, cb) {
    cb(null, 'AR_' + Date.now() + '-' + file.originalname);
  }
});

const uploadAR = multer({ storage: storageAR }).single('attendanceReport');

//upload attendance report
exports.uploadAttendanceReport = (req, res) => {
  uploadAR(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file', error: err });
    }

    try {
      const eventId = req.params.eventId;
      const event = await Event.getAEvent(eventId);
      const prevFile = event[0]?.attendanceReport;

      if (prevFile) {
        const prevPath = path.join(__dirname, '../../public/assets/files', prevFile);
        fs.unlink(prevPath, (err) => {
          if (err) console.error('Error deleting previous attendance report:', err);
        });
      }

      if (req.file) {
        req.body.attendanceReport = req.file.filename;
        await Event.storeAttendanceR(eventId, req.body.attendanceReport);
        res.status(200).json({ message: 'Successfully saved attendance report' });
      } else {
        res.status(400).json({ message: 'No file received' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

// Delete Attendance Report
exports.deleteAttendanceReport = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.getAEvent(eventId);
    const prevFile = event[0]?.attendanceReport;

    if (prevFile) {
      const prevPath = path.join(__dirname, '../../public/assets/files', prevFile);
      fs.unlink(prevPath, async (err) => {
        if (err) {
          console.error('Error deleting previous attendance report:', err);
          return res.status(500).json({ message: 'Error deleting previous attendance report', error: err });
        }
        await Event.deleteAR(eventId);
        res.status(200).json({ message: 'Previous attendance report deleted successfully!' });
      });
    } else {
      res.status(200).json({ message: 'No previous attendance report to delete' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};