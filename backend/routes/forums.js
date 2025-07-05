const express = require("express");
const { 
  all_job_posting_user, 
  getallchats, 
  getalljobpost, 
  insertadminchats, 
  insertchats, 
  getallIntershipPost,
  getallchatsInter,
  insertadminchatsinter,
  all_job_posting_userInter,
  insertchatsInter
} = require("../controllers/forums.js");

const router = express.Router();

router.get("/:sid", all_job_posting_user); //student
router.get("/intership/:sid", all_job_posting_userInter); //student
router.get("/chats/:jobCompanyId", getallchats);  //student
router.get("/chats/intership/:jobCompanyId", getallchatsInter);  //student
router.post("/chats", insertchats); //student
router.post("/chats/intership", insertchatsInter); //student
router.get("/admin/jobpost", getalljobpost); //admin
router.get("/admin/intership", getallIntershipPost); //admin
router.post("/admin/chats", insertadminchats); //admin
router.post("/admin/chats/intership", insertadminchatsinter); //admin

// router.post("/:postid",getallforumuser);
// router.put("/:postid",updateforumuser);

module.exports = router;
