const express = require("express")
const coureses = express.Router()
const cors = require("cors")

const Course = require("../models/Course")
coureses.use(cors())

/* Add new Course */
coureses.post("/createCourse", (req, res) => {
    const today = new Date()
    const courseData = {
        course_name: req.body.course_name,
        course_code: req.body.course_code,
        dept_id: req.body.dept_id,
        dept_name: req.body.dept_name,
        description: req.body.description,
        credits: req.body.credits,
        created: today
    }
    Course.findOne({
        course_code: req.body.course_code
    })
    .then(course => {
        if (!course) {
            Course.create(courseData)
                .then(course => {
                    res.json({ status: course.course_name+ ' is created' })
                })
                .catch(err => {
                    res.send('error: ' + err)
                })
        } else {
            res.json({ error: 'Course already exists' })
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

/* Get Course List*/
coureses.get("/all", (req, res) => {
    Course.find({})
        .sort({ update_at: -1 })
        .then(coureses => {
            setTimeout(() =>{
             res.json(coureses);
            },1000)
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        });
})
/* Update Courese information */
coureses.put("/UpdateCourse/:courseID", (req, res) => {
    Course.findOneAndUpdate({
        _id: req.params.courseID
    },{
        $set: {
            course_name: req.body.course_name,
            course_code: req.body.course_code,
            dept_id: req.body.dept_id,
            dept_name: req.body.dept_name,
            description: req.body.description,
            credits: req.body.credits,
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

/* Query By Course ID */
coureses.post("/queryCoursebyID/:courseID", (req, res) => {
    Course.findOne({
        _id: req.params.courseID

    })
        .then(courese => {
            const qCourse = {
                _id: courese._id,
                course_name: courese.course_name,
                course_code: courese.course_code,
                dept_id: courese.dept_id,
                dept_name: courese.dept_name,
                description: courese.description,
                credits: courese.credits,
            }
            res.send(qCourse)
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        });
})

/* Delete a course */
coureses.delete("/delcoursebyID/:courseID", (req, res) => {
    Course.findOneAndRemove({
      _id: req.params.courseID
    })
      .then(coureses => res.send(`${coureses.course_name}Successfully deleted`))
      .catch(err => res.json(err));
});

module.exports = coureses