const mongoose = require("mongoose")
const Schema = mongoose.Schema

const DeptSchema = new Schema({
    dept_name: {
        type: String,
        required: true
    },
    dept_head_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dept_head_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Department = mongoose.model('departments', DeptSchema)