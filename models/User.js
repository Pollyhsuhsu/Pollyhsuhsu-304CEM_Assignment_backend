const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    HKID: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    phone_no: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    e_c_person: {
        type: String,
        required: false
    },
    e_c_person_no: {
        type: String,
        required: false
    },
    bith_data: {
        type: Date,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    photo:{
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('users', UserSchema)