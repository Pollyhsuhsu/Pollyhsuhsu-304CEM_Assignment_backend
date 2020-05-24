const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    course_name: {
        type: String,
        required: true
    },
    course_code: {
        type: String,
        required: true
    },
    dept_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    dept_name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    credits: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = Course = mongoose.model('Courses', CourseSchema)