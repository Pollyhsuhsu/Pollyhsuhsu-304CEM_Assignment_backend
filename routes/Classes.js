const express = require("express")
const classes = express.Router()
const cors = require("cors")

const Class = require("../models/Class")
classes.use(cors())

classes.post("/createClass", (req, res) => {
    const today = new Date()
    const classData = {
        class_name: req.body.class_name,
        class_pgrmCode:req.body.class_pgrmCode,
        class_dept:req.body.class_dept,
        active: req.body.active,
        class_year: req.body.class_year,
        class_TimeDetails: req.body.class_TimeDetails,
        student: req.body.class_students,
        created: today
    }

    Class.findOne({
        class_name: req.body.class_name
    })
    .then(activeClass => {
        if (!activeClass) {
            Class.create(classData)
                .then(activeClass => {
                    res.json({ status: activeClass.class_name+ ' is created',class_id: activeClass._id })
                })
                .catch(err => {
                    res.send('error: ' + err)
                })
        } else {
            res.json({ error: 'Class already exists' })
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

/* Get Class list */
classes.get("/all", (req, res) => {
    Class.find({})
        .sort({ update_at: -1 })
        .then(classes => {
            setTimeout(() =>{
             res.json(classes);
            },1000)
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        });
})

/* Update Class Information*/
classes.put("/UpdateClass/:class_id", (req, res) => {
    Class.findOneAndUpdate({
        _id: req.params.class_id
    },{
        $set: {
            // dept_name: req.body.dept_name,
            // dept_head_id: req.body.dept_head_id,
            // dept_head_name: req.body.dept_head_name
        }
    },
    {
        new: true
    }
    ).then(activeClass => 
        setTimeout(() =>{
            res.json(activeClass);
           },700)
        )
     .catch(err => res.json(err))
})

/* Query By Class ID */
classes.post("/queryClassbyID/:class_id", (req, res) => {
    Class.findOne({
        _id: req.params.class_id

    })
        .then(activeClass => {
            const qClass= {
                _id: activeClass._id,
                class_name: activeClass.class_name,
                class_pgrmCode:activeClass.class_pgrmCode,
                active: activeClass.active,
                class_year: activeClass.class_year,
                class_TimeDetails: activeClass.class_TimeDetails,
                student: activeClass.student,
            }
            res.send(qClass)
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        });
})

/* Query By Class ID and User ID*/
classes.get("/queryClassbyIDandUserID/:class_id&:user_id", (req, res) => {
    Class.findOne({
        _id: req.params.class_id,
        class_TimeDetails: { $elemMatch: { teacher_id: req.params.user_id }}
    })
        .then(activeClass => {
            const qClass= {
                _id: activeClass._id,
                class_name: activeClass.class_name,
                class_pgrmCode:activeClass.class_pgrmCode,
                active: activeClass.active,
                class_year: activeClass.class_year,
                class_TimeDetails: activeClass.class_TimeDetails,
                student: activeClass.student,
            }
            res.send(qClass)
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        });
})

/* Delete a Class */
classes.delete("/delClassbyID/:classID", (req, res) => {
    Class.findOneAndRemove({
      _id: req.params.classID
    })
      .then(classs => res.send(`${classs.class_id}Successfully deleted`))
      .catch(err => res.json(err));
})
module.exports = classes