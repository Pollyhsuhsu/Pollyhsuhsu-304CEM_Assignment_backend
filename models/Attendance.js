const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AttendanceSchema = new Schema({
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    course_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    class_TimeDetails_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    class_time: {
        type: String,
        required: true
    },
    student_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    student_last_name: {
        type: String
    },
    student_first_name: {
        type: String
    },
    state:  {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Attendance = mongoose.model('Attendances', AttendanceSchema)