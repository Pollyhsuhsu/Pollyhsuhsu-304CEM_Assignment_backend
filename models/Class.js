const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ClassSchema = new Schema({
    class_name: {
        type: String,
        required: true
    },
    class_dept:{
        type: String,
    },
    class_year:{
        type: Number,
    },
    class_pgrmCode: {
        type: String,
        required: true
    },
    active: {
        type: Boolean
    },
    class_TimeDetails:[{
        course_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        course_code:{
            type: String
        },
        course_name:{
            type: String 
        },
        startTime:{
            type: String
        },
        endTime:{
            type: String
        },
        weekday:[],
        timeList:[],
        date:[],
        teacher_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        create_date:{
            type: Date,
            default: Date.now 
        }
    }],
    student:[{
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        student_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    }]  
})

module.exports = Class = mongoose.model('Class', ClassSchema)