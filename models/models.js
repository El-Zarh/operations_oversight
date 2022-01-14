const mongoose = require("mongoose");

const mongoosePaginate = require("mongoose-paginate-v2");

//@Desc: Generator Report Form Modal Schema
const generatorSchema = new mongoose.Schema(
    {
    location: { type: String, required: true },
    manager: { type: String },
    month: { type: Date, default: Date.now },
    capacity1: { type: Number },
    usage1: { type: Number },
    runtime1: { type: Number },
    capacity2: { type: Number },
    usage2: { type: Number },
    runtime2: { type: Number },
    choice: { type: String, possibleValues: ['yes', 'no']}
       
});

//@Desc: Attendance Report Form Modal Schema
const attendanceSchema = new mongoose.Schema(
    {
     employees: { type: String },
     electrical: { type: Boolean, possibleValues: ['yes','no','na']},
     plumber: { type: Boolean, possibleValues: ['yes','no','na']},
     hvac: { type: Boolean, possibleValues: ['yes','no','na']},
     janitors: { type: Boolean, possibleValues: ['yes','no','na']},
     absent: { type: Boolean, possibleValues: ['yes','no','na']},
     absentees: { type: String, possibleValues: ['yes','no','na']},
});

//@Desc: Register User Form Modal Schema
const userSchema = new mongoose.Schema(
    {
    userEmail: { type: String, required: true, unique: true },
    role: { type: String, 
        default: 'basic',
        enum: ["admin", "basic"], required: true },
    password: { type: String, required: true }    
})

//@ Desc: mongoose-paginate plugin  
generatorSchema.plugin(mongoosePaginate);
attendanceSchema.plugin(mongoosePaginate);

//@Desc: Create Model Objects  
const Generator = mongoose.model('Generator', generatorSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);
const User = mongoose.model('User', userSchema);

//@Desc: Export Model Objects
module.exports = { Generator, Attendance, User };