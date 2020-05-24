const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PgrmSchema = new Schema({
    pgrm_name: {
        type: String,
        required: true
    },
    pgrm_code:{
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
    courses:[
        {
        course_id:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Course'
        },
        course_code:{
         type: String
        },
        course_name:{
         type: String 
        },
        create_date:{
         type: Date,
         default: Date.now 
        }
    }
    ],
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Program = mongoose.model('programs', PgrmSchema)