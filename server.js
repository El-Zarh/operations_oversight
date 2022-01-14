const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");


//const coockieParser = require("cookie-parser");
const fs = require('fs').promises;
//const mongoose = require("mongoose");

const { createPDF } = require("./config/pdf");
const cors = require("cors");

const { Generator, Attendance, User } = require("./models/models");
const connectDB = require("./config/mongodb");
//const { allowLoggedInUser, grantAccess } = require("./authenticate/auth");
const jwt = require("jsonwebtoken");
//const { buildPDF }  = require("./config/pdf");

const cookieParser = require("cookie-parser");
//const { resourceLimits } = require("worker_threads");

const JWT_SECRET = 'fusaky32sr76asljnla@jbjsdn#jndnskln!k2s';

dotenv.config({ path: "./config/config.env" }); //Load config variables

connectDB() // connect to MongoDB

const app = express(); //Initialize the application

//app.set('view engine', 'ejs');
//@ Desc: Use static folder
app.use("/", express.static(path.join(__dirname, "public"))); 
//app.use(express.static(__dirname + "/public/dashboard.html"));
app.use(cookieParser());
app.use(bodyParser.json()); //Body Parser
//app.use(setUser);
//app.use(allowLoggedInUser);
//app.use(grantAccess);
app.use(cors()); //use cors

// @ Desc: Admin GET Attendance report with Pagination functinality
app.get('/attendance', async(req,res) => {
    try{
        const { page, perPage} = req.query;
        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 2
        };
        const attendance = await Attendance.paginate({}, options);
        res.json(attendance);

    }catch (err){
        console.error(err);
        return res.status(500).json(err);
    } 
})

// @ Desc: Admin GET Power report with Pagination functinality 
app.get('/power', async (req, res) => {
      
    try{
        
        const { page, perPage} = req.query;
        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 1
        };
        const generators = await Generator.paginate({}, options);
        res.json(generators);  

    }catch (err){
        console.error(err);
        return res.status(500).json(err);
    }  
})

// @ Desc: User Generator report submission/post  request route
app.post('/api/power', async(req, res) => {

    const { location, manager, month, capacity1, usage1, runtime1, capacity2, usage2, runtime2, choice } = req.body;

    try{
        const results = await Generator.create({
            location,
            manager,
            month,
            capacity1,
            usage1,
            runtime1,
            capacity2,
            usage2,
            runtime2,
            choice
        })
        console.log('Report Submitted Successfully to Database!: ', results);
        
    }catch(error){
        if (error.code === 404){
            return res.json({ status: 'error', error: 'Problem submitting report'})
        }
        throw error;
    }
        res.json({ status: 'successful' })      
})

// @Desc: User submision/post route for Staff Attendance Report 
app.post('/api/attendance', async(req, res) => {

    const { employees, electrical, plumber, hvac, janitors, absentees } = req.body;
    try{
        const response = await Attendance.create({
            employees,
            electrical,
            plumber,
            hvac,
            janitors,
            absentees
        })
        console.log('Report Submitted Successfully to Database!: ', response);
    }catch(error){
        if (error.code === 404){
            return res.json({ status: 'error', error: 'Problem submitting report'})
        }
        throw error;
    }
        res.json({ status: 'successful' })
})

//@ Desc: Admin POST/ Login request to access admin page tackle tomorrow
app.post('/api/admin', async(req, res) => {
    const { userEmail, password, role } = req.body;

    const user = await User.findOne({ userEmail }).lean();
    
    if(!user){
        return res.json({ status: 'error', error: 'Invalid user-email'});   
    }
    
    if(await bcrypt.compare(password, user.password)){

        const token = jwt.sign(
            {
                id: user._id,
                userEmail: user.userEmail      
            },
            JWT_SECRET  
        )       
        return res.json({ status: 'ok', data: token });
        //console.log("You have successfully logged in"); 
        //res.sendFile("/dashboard.html");         
    }
        return res.json({ status: 'error', error: 'Invalid user-password'});     
});

// @ Desc: User POST/ Login request route to access dashboard page.
app.post('/api/login', async(req, res) => {
    const { userEmail, password, role } = req.body;

    const user = await User.findOne({ userEmail }).lean();

    if(!user){
        return res.json({ status: 'error', error: 'Invalid user-email'});   
    }
    
    if(await bcrypt.compare(password, user.password)){

        const token = jwt.sign(
            {
                id: user._id,
                userEmail: user.userEmail      
            },
            JWT_SECRET  
        )       
        return res.json({ status: 'ok', data: token });
        //console.log("You have successfully logged in"); 
        //res.sendFile("/dashboard.html");         
    }
        return res.json({ status: 'error', error: 'Invalid user-password'});     
});

// @ Desc: Admin POST/ Register  user request route.
app.post('/api/register', async(req, res) =>{
    const { userEmail, role, password: plainTextPassword } = req.body;

    if(!userEmail || typeof userEmail !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username'});
    }

    if(!role || typeof role !== 'string') {
        return res.json({ status: 'error', error: 'Invalid User Role'});
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password'});
    }
    
    if(plainTextPassword.length < 6){
        return res.json({ status: 'error', error: 'Password too short. It should be at least 6 characters!' });
    }
 
    const password = await bcrypt.hash(plainTextPassword, 10)
    try{
        const response = await User.create({ userEmail, role, password });
        console.log('User created successfully: ', response);
    }catch(error){
        if(error.code === 11000){     
          return res.json({ status: 'error', error: 'User-email already in use' });
        }
        throw error;
    }
    res.json({ status: 'ok' })
});

/*--function setUser(req, res, next) {
    const userId = req.body.userId;
    if(userId){
        req.user = users.find(user => user.id === userId)
    }
    next();  
}--*/

// @ Desc: Port runnin server 
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => 
    console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`)
);