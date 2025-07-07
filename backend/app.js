const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const bodyParser = require("body-parser");
const sequelize = require('./config/config');
const companyRoutes = require('./routes/companyRoutes');
const remarkRoutes = require('./routes/remarkRoutes');
const jobPostingRoutes = require('./routes/jobPostingRoutes');
const studentDetailRoutes = require('./routes/studentDetailRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const forumRoutes = require('./routes/forumRoutes');
const forum = require("./routes/forums.js");
const hrRoutes = require('./routes/hrRoutes');
const driveStatusRoutes = require('./routes/driveStatusRoutes');
const openaiRoute = require("./routes/openAi.js");
const adminAptRoutes = require("./routes/adminTestRoute.js");
const interviewRoutes = require("./routes/interview/interviewRoutes.js");
const interviewDetailRoutes = require('./routes/interview/interviewDetailRoutes.js');
const adminDashboardRoutes = require("./routes/adminDashboard.js");
const CompanywisePlacedRoute = require("./routes/reports/CompanywisePlacedRoute.js");
const GenderwisePlacedRoute = require("./routes/reports/GenderwisePlacedRoute.js");
const DriveResultRoute = require('./routes/reports/DriveResultRoute.js');
const StudentTableGenRoute = require("./routes/reports/StudentTableGenRoute.js");
const CompanyTableGenRoute = require("./routes/reports/CompanyTableGenRoute.js");
const ERP = require("./routes/reports/ERPReportRoute.js");
const IndiERP = require("./routes/reports/IndiERPReportRoute.js");
const RSLReport = require('./routes/reports/RSLReportRoute.js');
const corsOptions = require('./middleware/corsMiddleware');
const stuRegRouter=require('./routes/Registration/stu_reg.js');
const job_postings = require('./routes/Dashboard/JobPostingCompanies.js');
const registerStudent = require("./routes/Dashboard/RegisterStudent.js");
const getQuestions = require("./routes/Dashboard/Questions.js");
const registeredCompaniesRoute = require('./routes/Dashboard/RegisteredCompanies.js');
const saveAnswer = require('./routes/saveAnswer');
const blackListRoute = require('./routes/blackListedRouter.js')
const slab = require('./routes/slabRoutes.js');
const Test = require('./routes/TestRoutes.js');
const eventRouter = require('./routes/Eventrouters.js');


// practice test -  added by prachi on 7th july 2025
const practice = require('./routes/practiceTest/practiceRoutes.js')



// const db = require('./models'); 
const login=require('./routes/Login/login.js');
const connection = require('./config/dbConfig.js');
const { upload } = require('./controllers/jobPostingController.js');
const {authenticateToken, authenticateTokenStudents} = require('./middleware/authMid.js');
// const { viewEventDoc } = require('./controllers/eventController/eventController.js');
const machineRouter = require('./routes/machineTestRoutes/machineTestRoutes.js');
const { getAllStudentsFOrEligible, addStudentsTooeligible, deleteStudentsTooeligible } = require('./controllers/studentDetailController.js');
const app = express();
// const fileUpload = require('express-fileupload');

const PORT = 5011;
// const allowedOrigins = ['http://localhost:5173', 'http://localhost:5000', 'http://localhost:3001'];
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes


app.use('/practice',practice);



app.use('/companies',authenticateToken, companyRoutes);
app.use('/remarks', authenticateToken,remarkRoutes);
app.use('/jobpostings', jobPostingRoutes);
app.use('/student', authenticateTokenStudents,studentDetailRoutes);
app.use('/announcements', announcementRoutes);
// app.use('/forums', forumRoutes);
app.use('/forums', authenticateTokenStudents,forum); // new
app.use('/hr', authenticateToken, hrRoutes);
app.use('/driveStatus', authenticateToken,driveStatusRoutes);
app.use('/ans',authenticateTokenStudents,saveAnswer);
app.use("/login", login);
app.use("/stu/jobposts",authenticateTokenStudents,job_postings);
app.use("/addstu", registerStudent);
app.use("/que", authenticateTokenStudents,getQuestions); 
app.use("/register", stuRegRouter);
app.use("/admin/dashboard", authenticateToken,adminDashboardRoutes);
//
app.use("/openai", authenticateTokenStudents,openaiRoute);
app.use("/admin/aptitude", authenticateToken,adminAptRoutes);
app.use('/interviews', authenticateTokenStudents,interviewRoutes);
app.use('/details', authenticateTokenStudents,interviewDetailRoutes);
app.use('/rc', authenticateTokenStudents,registeredCompaniesRoute);

//reports
app.use("/companywiseplaced",authenticateToken,CompanywisePlacedRoute);
app.use("/genderwiseplaced",authenticateToken,GenderwisePlacedRoute);
app.use("/driveresult",authenticateToken,DriveResultRoute);
app.use("/studentgen",authenticateToken,StudentTableGenRoute);
app.use("/companygen",authenticateToken,CompanyTableGenRoute);
app.use("/erp",authenticateToken,ERP);
app.use("/indierp",authenticateToken,IndiERP);
app.use("/rsl", authenticateToken,RSLReport);
//
app.use('/blackList',authenticateToken,blackListRoute);
app.use('/slab',authenticateToken,slab);
app.use('/aptitude',authenticateTokenStudents, Test);
// app.use("/event", authenticateTokenStudents,eventRouter);

//machine Test
app.use("/machineTest", authenticateTokenStudents,machineRouter);

app.use("/event",eventRouter);


//Added on 22 sep for event int
app.use(express.static("public"));

// just for testing purposes start

app.set("views", "views");
app.set("view engine", "ejs");


// just for testing purposes end


// app.use(cors());
// app.use(
//   fileUpload({
//     createParentPath: true,
//   })
// );

// app.get('/events/viewEvent/:fileName', viewEventDoc);


app.get("/auth/viewDoc/docs/:fileName",(req, res)=>{
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname,'./uploads/docs', fileName);
  console.log(filePath)
  res.sendFile(filePath);
});


app.get("/auth/viewDoc/resume/:fileName",(req, res)=>{
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname,'./uploads', fileName);
  console.log(filePath)
  res.sendFile(filePath);
});

app.get("/postedJobs",authenticateTokenStudents,(req,res)=>{
  connection.query(
    `select 
      jp.*,com.name
    from job_postings as jp
    left join companies as com on jp.companyId = com.id`,(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).json({"Message":"Server Error"});
      }
      else{
        res.status(200).json({data:data})
      }
    }
  )
})


// Set up storage engine using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/chat/'); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Rename the file to the current timestamp with the original file extension
    const fileExtension = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}${fileExtension}`);
  },
});

// File type and size constraints
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|pdf|xls|xlsx|csv/; 
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb('Error: Only images and PDFs are allowed!');
  }
};

const upload_chat = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: fileFilter,
});

// File upload route
app.post('/api/chat/upload', upload_chat.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }
    res.status(200).json({
      message: 'File uploaded successfully!',
      filePath: `/uploads/${req.file.filename}`,
      link:`https://api.tpo.getflytechnologies.com/auth/viewDoc/chat/${req.file.filename}`
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error uploading file', error });
  }
});


app.get("/auth/viewDoc/chat/:fileName",(req, res)=>{
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname,'./uploads/chat', fileName);
  console.log(filePath)
  res.sendFile(filePath);
});

app.post('/Updatejobpostings',authenticateToken,upload,(req,res)=>{
  let {id,job_description,company_type, package_details, roles, criteria_10th, criteria_12th, deg_criteria, diploma_criteria, eligible_branches, deadline, batch_date,docs  } = req.body;
  let filename = docs;

  // Check if file exists
  if (req.file) {
    if (!req.file.originalname.match(/\.(pdf|doc|docx)$/)) {
      return res.status(400).json({ message: 'Only PDF, DOC, or DOCX files are allowed!' });
    }
    filename = req.file.filename;
  }

    const updateQuery = `
        UPDATE job_postings
        SET 
            batch_date = ?,  
            criteria_10th = ?, 
            criteria_12th = ?, 
            deadline = ?, 
            deg_criteria = ?, 
            diploma_criteria = ?, 
            docs = ?, 
            eligible_branches = ?, 
            job_description = ?, 
            package_details = ?, 
            roles = ?,
            company_type = ?
        WHERE id = ?;
    `;

    const values = [
        batch_date,
        criteria_10th,
        criteria_12th,
        deadline,
        deg_criteria,
        diploma_criteria,
        filename,
        eligible_branches,
        job_description,
        package_details,
        roles,
        company_type,
        id
    ];

    connection.query(updateQuery, values, (err,data)=> {
      if (err) {
        console.log(err);
          return res.json({ success: false, message: err.message });
      }
    console.log(company_type)

      res.json({ success: true });
  });
})


app.post('/forums/admin/jobpost/delete/:post_id',authenticateToken, async (req, res) => {
  const post_id = req.params.post_id;

  // console.log(post_id)
  const updateQuery = "delete from questions where companyId = ?";
  const updateQuery1 = "delete from job_postings where id = ?";
    connection.query(updateQuery,[post_id], (err, result) => {
      if (err) {console.log(err); return res.status(500).json(err);}
      connection.query(updateQuery1,[post_id], (err, result) => {
        if (err) {console.log(err); return res.status(500).json(err);}
        else return res.status(200).json({msg:"Deleted"});
      });
    });
});

app.post('/forums/admin/intership/delete/:post_id',authenticateToken, async (req, res) => {
  const post_id = req.params.post_id;

  // console.log(post_id)
  const updateQuery = "delete from intership_questions where companyId = ?";
  const updateQuery1 = "delete from intership_postings where id = ?";
    connection.query(updateQuery,[post_id], (err, result) => {
      if (err) {console.log(err); return res.status(500).json(err);}
      connection.query(updateQuery1,[post_id], (err, result) => {
        if (err) {console.log(err); return res.status(500).json(err);}
        else return res.status(200).json({msg:"Deleted"});
      });
    });
});

app.get('/report/companywiseBranchWise',authenticateToken,async(req,res)=>{
  connection.query(
    `    
select
name,
sum(CS) as CS,
SUM(IT) as IT,
SUM(AIDS) as AIDS,
sum(CS) + SUM(IT) + SUM(AIDS) as Total,
Package,
roles,
company_type
from 
(select
      name,
      case when branch = 'CS' then COUNT(branch) else 0 end CS, 
      case when branch = 'IT' then count(branch) else 0 end IT ,
      case when branch = 'AIDS' then count(branch) else 0 end AIDS,
      Package,
      roles,
      company_type
    from(
    select 
        c.name,
        sd.branch,
        jp.package_details as Package,
        jp.roles,
        jp.company_type,
        placedStudent
    from companies as c
    inner join job_postings as jp on jp.companyId = c.id
    left join drive_status as ds on ds.p_id = jp.id
    left join student_details as sd on sd.id = ds.s_id
    where ds.placedStudent = 1 and sd.degree_year in (select batch from current_batch)
    ) as a
    group by name, branch,Package,roles,company_type
) as a
group by name,Package,roles,company_type
    
    union all 
    
    select
      name,
      0 as  CS, 
      0 as  IT ,
      0 as  AIDS,
      0 as Total,
      Package,
      roles,
      company_type
    from(
    select 
        c.name,
        sd.branch,
        jp.package_details as Package,
        jp.roles,
        jp.company_type,
        placedStudent
    from companies as c
    inner join job_postings as jp on jp.companyId = c.id
    left join drive_status as ds on ds.p_id = jp.id
    left join student_details as sd on sd.id = ds.s_id
    where name not in (
		select 
			c.name
		from companies as c
		inner join job_postings as jp on jp.companyId = c.id
		left join drive_status as ds on ds.p_id = jp.id
		left join student_details as sd on sd.id = ds.s_id
		where ds.placedStudent = 1 and sd.degree_year in (select batch from current_batch)
    ) 
    ) as a
    group by name,Package,roles,company_type


    union all

    select
	"Total " as name,
    sum(CS) as CS,
	SUM(IT) as IT,
	SUM(AIDS) as AIDS,
	sum(CS) + SUM(IT) + SUM(AIDS) as Total,
    "" as Package,
    "" as role,
    "" as company_type    
from (select
      name,
      case when branch = 'CS' then COUNT(branch) else 0 end CS, 
      case when branch = 'IT' then count(branch) else 0 end IT ,
      case when branch = 'AIDS' then count(branch) else 0 end AIDS,
      Package,
      roles,
      company_type
    from(
    select 
        c.name,
        sd.branch,
        jp.package_details as Package,
        jp.roles,
        jp.company_type,
        placedStudent
    from companies as c
    inner join job_postings as jp on jp.companyId = c.id
    left join drive_status as ds on ds.p_id = jp.id
    left join student_details as sd on sd.id = ds.s_id
    where ds.placedStudent = 1 and sd.degree_year in (select batch from current_batch)
    ) as a
    group by name, branch,Package,roles,company_type
) as a
    `,(err,data)=>{
      if(err){
        console.log(err);
        return res.status(500).json({msg:"Error"});
      }
      else{
        return res.status(200).json({data:data});
      }
    }
  )
})


app.get('/report/singleStudentSingleOffer',authenticateToken,async(req,res)=>{
  connection.query(
    `
    select
      *
    from(
    select 
      c.name as company_name,
        concat(sd.first_name,' ',sd.middle_name,' ',sd.last_name) as stud_name,
        sd.clg_id,
        sd.branch,
      jp.package_details as package,
      jp.roles,
      jp.company_type,
        row_number() over (partition by clg_id order by package_details desc) as rn
    from companies as c
    inner join job_postings as jp on jp.companyId = c.id
    left join drive_status as ds on ds.p_id = jp.id
    left join student_details as sd on sd.id = ds.s_id
    where ds.placedStudent = 1
    ) as a where rn = 1
    `,(err,data)=>{
      if(err){
        console.log(err);
        return res.status(500).json({msg:"Error"});
      }
      else{
        return res.status(200).json({data:data});
      }
    }
  )
})

app.get('/getSummary',(req,res)=>{
  connection.query(
      `
      select
        count(*) as s,branch
      from student_details
      where degree_year in (select batch from current_batch)
      group by branch
      `,(err,strength)=>{
        if(err) console.log(err);
        else{
          connection.query(
              `
                SELECT 
                    case when Branch = 'CS' then 'CS' else Branch end as Branch,
                    onoff,
                    Total_Count
                FROM (
                    SELECT 
                        'CS' AS Branch, 
                        onoff, 
                        SUM(cs) AS Total_Count
                    FROM (
                        SELECT 
                            jp.onoff,
                            CASE WHEN jp.eligible_branches LIKE '%CS%' THEN 1 ELSE 0 END AS cs,
                            CASE WHEN jp.eligible_branches LIKE '%IT%' THEN 1 ELSE 0 END AS it,
                            CASE WHEN jp.eligible_branches LIKE '%AI&DS%' THEN 1 ELSE 0 END AS aids
                        from job_postings AS jp
                    ) AS sub
                    GROUP BY onoff

                    UNION ALL

                    SELECT 
                        'IT' AS Branch, 
                        onoff, 
                        SUM(it) AS Total_Count
                    FROM (
                        SELECT 
                            jp.onoff,
                            CASE WHEN jp.eligible_branches LIKE '%CS%' THEN 1 ELSE 0 END AS cs,
                            CASE WHEN jp.eligible_branches LIKE '%IT%' THEN 1 ELSE 0 END AS it,
                            CASE WHEN jp.eligible_branches LIKE '%AI&DS%' THEN 1 ELSE 0 END AS aids
                        from job_postings AS jp
                    ) AS sub
                    GROUP BY onoff

                    UNION ALL

                    SELECT 
                        'AIDS' AS Branch, 
                        onoff, 
                        SUM(aids) AS Total_Count
                    FROM (
                        SELECT 
                            jp.onoff,
                            CASE WHEN jp.eligible_branches LIKE '%CS%' THEN 1 ELSE 0 END AS cs,
                            CASE WHEN jp.eligible_branches LIKE '%IT%' THEN 1 ELSE 0 END AS it,
                            CASE WHEN jp.eligible_branches LIKE '%AI&DS%' THEN 1 ELSE 0 END AS aids
                        from job_postings AS jp
                    ) AS sub
                    GROUP BY onoff
                ) AS pivot_table
                ORDER BY Branch, onoff;

              `,(err,campusType)=>{
                if(err) console.log(err);
                else{
                  connection.query(
                                `
                                  select 
                                      b.*,
                                        coalesce(a.count_on,0) as count_on,
                                        coalesce(c.count_off,0) as count_off
                                    from
                                    (
                                    select
                                      count(distinct s.id) as count_on,
                                        s.branch
                                    from student_details as s
                                    inner join drive_status as ds on ds.s_id = s.id and ds.placedStudent = 1
                                    inner join job_postings as jp on jp.id = ds.p_id
                                    inner join companies as c on c.id = jp.companyId
                                    where jp.onoff = 'on'
                                    group by s.branch
                                    ) as a
                                    right join (SELECT
                                    sd.ac_yr as academic_year,
                                    interested_in,
                                    branch,
                                    COUNT(*) AS total_students,
                                    SUM(CASE WHEN ds.placedStudent = 1 THEN 1 ELSE 0 END) AS placed_students,
                                    COUNT(*) - SUM(CASE WHEN ds.placedStudent = 1 THEN 1 ELSE 0 END) AS unplaced_students
                                FROM (
                                    SELECT s_id, MAX(placedStudent) AS placedStudent
                                    FROM drive_status
                                    GROUP BY s_id
                                ) AS ds
                                right JOIN student_details sd ON ds.s_id = sd.id
                                where 
                                  interested_in is not null and 
                                    degree_year in (select batch from current_batch)
                                GROUP BY sd.ac_yr, interested_in,branch
                                order by sd.ac_yr) as b
                                on a.branch = b.branch and b.interested_in = 'Placement'
                                left join (
                                select
                                  count(distinct s.id) as count_off,
                                    s.branch
                                from student_details as s
                                inner join drive_status as ds on ds.s_id = s.id and ds.placedStudent = 1
                                inner join job_postings as jp on jp.id = ds.p_id
                                inner join companies as c on c.id = jp.companyId
                                where jp.onoff = 'off'
                                group by s.branch
                                ) as c
                                on c.branch = b.branch and b.interested_in = 'Placement';
                                `,(err,regis)=>{
                                  if(err) console.log(err);
                                  else{
                                    connection.query(
                                      `
                                      select
                                        a.*,
                                          b.*,
                                          c.maxCompanyOffered,
                                          d.minCompanyOffered,
                                          e.minCompanySecured,
                                          f.maxCompanySecured
                                      from (
                                          select
                                            max(cast(package_details as double)) as max_offered,
                                            min(cast(package_details as double)) as min_offered,
                                            avg(cast(package_details as double)) as avg_offered
                                          from job_postings
                                          where cast(package_details as double) <> 0
                                      ) as a
                                      join (
                                          select 
                                            max(cast(package_details as double)) as max_se,
                                            min(cast(package_details as double)) as min_se,
                                            avg(cast(package_details as double)) as avg_se
                                          from job_postings as jp 
                                          right join drive_status as ds on ds.p_id = jp.id and placedStudent = 1
                                          where cast(package_details as double) <> 0
                                      ) as b
                                      join
                                        (
                                          select 
                                            c.name as maxCompanyOffered,
                                              package_details
                                          from companies as c 
                                          inner join job_postings as jp 
                                          on jp.companyId = c.id
                                          where cast(package_details as double) = (select max(cast(package_details as double)) from job_postings)
                                          ) as c
                                      join 
                                         (
                                          select 
                                            c.name as minCompanyOffered,
                                              package_details
                                          from companies as c 
                                          inner join job_postings as jp 
                                          on jp.companyId = c.id
                                          where cast(package_details as double) = 
                                          (select min(cast(package_details as double)) from job_postings where cast(package_details as double) <> 0)
                                          and cast(package_details as double) <> 0
                                        ) as d
                                        join
                                        (
                                        select 
                                          c.name as minCompanySecured,
                                            package_details
                                        from companies as c 
                                        inner join job_postings as jp 
                                        on jp.companyId = c.id
                                        inner join drive_status as ds on ds.p_id = jp.id and placedStudent = 1
                                        where cast(package_details as double) = 
                                        (select min(cast(package_details as double)) from job_postings as jp
                                        inner join drive_status as ds on ds.p_id = jp.id and ds.placedStudent = 1 where cast(package_details as double) <> 0)
                                        and cast(package_details as double) <> 0
                                        ) as e
                                        join
                                        (
                                        select 
                                          c.name as maxCompanySecured,
                                            package_details
                                        from companies as c 
                                        inner join job_postings as jp 
                                        on jp.companyId = c.id
                                        inner join drive_status as ds on ds.p_id = jp.id and placedStudent = 1
                                        where cast(package_details as double) = 
                                        (select max(cast(package_details as double)) from job_postings as jp
                                        inner join drive_status as ds on ds.p_id = jp.id and ds.placedStudent = 1 where cast(package_details as double) <> 0)
                                        and cast(package_details as double) <> 0
                                        ) as f
                                      `,(err,offered)=>{
                                        if(err) console.log(err);
                                        else{
                                          return res.status(200).json({strength:strength,campusType:campusType,regis:regis,offered:offered})
                                        }
                                      }
                                    )
                                  }
                                }
                            )
                          }
                        }
                  )
              }
        }
  )
})

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // return db.sequelize.sync();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// const http = require('http');
// // const socketIo = require('socket.io');
// const server = http.createServer(app);

// // const io = socketIo(server, {
// //   cors: {
// //     origin: '*', // Enable CORS for all domains
// //   },
// // });


// //   io.on('connection', (socket) => {
// //     console.log('A user connected:', socket.id);
  
// //     // Join user to groups
// //     socket.on('joinGroups', (userId) => {
// //       const query = `
// //         SELECT j.id as group_id 
// //           FROM companies AS c 
// //           INNER JOIN job_postings AS j 
// //           ON c.id = j.id;
// //       `;
  
// //       connection.query(query, [userId], (err, results) => {
// //         if (err) throw err;
  
// //         // Add the user to each group they belong to
// //         results.forEach(group => {
// //           socket.join(group.group_id);
// //           console.log(`User ${userId} joined group ${group.group_id}`);
// //         });
// //       });
// //     });

// //     socket.on('studentJoinGroups', (userId) => {
// //       const query = `
// //         select 
// //           j.id as group_id
// //         from drive_status as d 
// //         inner join job_postings as j on d.p_id=j.id 
// //         where d.s_id=?
// //       `;
  
// //       connection.query(query, [userId], (err, results) => {
// //         if (err) throw err;
  
// //         // Add the user to each group they belong to
// //         results.forEach(group => {
// //           socket.join(group.group_id);
// //           console.log(`User ${userId} joined group ${group.group_id}`);
// //         });
// //       });
// //     });
  
// //     // Handle sending messages to groups
// //     socket.on('message', ({ groupId, userId, message }) => {
// //       io.to(groupId).emit('message', { userId, message }); // Emit to group room
// //     });
  
// //     // Handle disconnect
// //     socket.on('disconnect', () => {
// //       console.log('A user disconnected');
// //     });
// //   });
  

app.get('/students/getAllStudentsFOrEligible',getAllStudentsFOrEligible);
app.post('/students/addEligibleStudents',addStudentsTooeligible);
app.post('/students/deleteEligibleStudents',deleteStudentsTooeligible);
app.post('/students/clearAllEligibleStudents',(err,res)=>{
  connection.query(`
    delete from eligible_students_for_drive
    `,(err,data)=>{
      if(err) console.log(err);
      return res.status(200);
    })
});
  

  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});