const express = require("express")
const attendances = express.Router()
const cors = require("cors")

const Attendance = require("../models/Attendance")
attendances.use(cors())

/* Set new Attendance */
attendances.post("/setAttedance", (req, res) => {
    const today = new Date()
    const setAtData = {
        class_id: req.body.class_id,
        course_id:req.body.course_id,
        class_TimeDetails_id: req.body.class_TimeDetails_id,
        class_time: req.body.class_time,
        student_id: req.body.student_id,
        student_last_name: req.body.student_last_name,
        student_first_name: req.body.student_first_name,
        state:req.body.state,
        created: today
    }
    Attendance.create(setAtData)
        .then(setAtData => {
            res.json({ status: 'Created' })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

/* Get attendance record */
attendances.get("/all", (req, res) => {
    Attendance.find({})
        .sort({ update_at: -1 })
        .then(attendances => {
            setTimeout(() =>{
             res.json(attendances);
            },1000)
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        });
})

/* Update attendance Information*/
attendances.put("/UpdateAttd/:attd_id", (req, res) => {
    Attendance.findOneAndUpdate({
        _id: req.params.attd_id
    },{
        $set: {
            class_id: req.body.class_id,
            class_TimeDetails_id: req.body.class_TimeDetails_id,
            course_id:req.body.course_id,
            class_time: req.body.class_time,
            student_id: req.body.student_id,
            student_last_name: req.body.student_last_name,
            student_first_name: req.body.student_first_name,
            state:req.body.state,
        }
    },
    {
        new: true
    }
    ).then(department => 
        setTimeout(() =>{
            res.json(department);
           },700)
        )
     .catch(err => res.json(err))
})

module.exports = attendances
