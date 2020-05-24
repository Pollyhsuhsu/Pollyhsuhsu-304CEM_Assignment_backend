const express = require("express")
const departments = express.Router()
const cors = require("cors")

const Department = require("../models/Department")
departments.use(cors())

/* Add new Depatment */
departments.post("/createDept", (req, res) => {
    const today = new Date()
    const deptData = {
        dept_name: req.body.dept_name,
        dept_head_id: req.body.dept_head_id,
        dept_head_name: req.body.dept_head_name,
        created: today
    }
    Department.findOne({
        dept_name: req.body.dept_name
    })
    .then(department => {
        if (!department) {
            Department.create(deptData)
                .then(department => {
                    res.json({ status: department.dept_name+ 'department is created',deptID: department._id  })
                })
                .catch(err => {
                    res.send('error: ' + err)
                })
        } else {
            res.json({ error: 'Department already exists' })
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

/* Get Department list */
departments.get("/all", (req, res) => {
    Department.find({})
        .sort({ update_at: -1 })
        .then(departments => {
            setTimeout(() =>{
             res.json(departments);
            },1000)
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        });
})

/* Update Department Information*/
departments.put("/UpdateDept/:dept_id", (req, res) => {
    Department.findOneAndUpdate({
        _id: req.params.dept_id
    },{
        $set: {
            dept_name: req.body.dept_name,
            dept_head_id: req.body.dept_head_id,
            dept_head_name: req.body.dept_head_name
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

/* Query By Department ID */
departments.post("/queryDeptbyID/:deptID", (req, res) => {
    Department.findOne({
        _id: req.params.deptID

    })
        .then(department => {
            const qDept = {
                _id: department._id,
                dept_name: department.dept_name,
                dept_head_id: department.dept_head_id,
                dept_head_name: department.dept_head_name
            }
            res.send(qDept)
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        });
})

/* Delete a Department */
departments.delete("/delDeptbyID/:deptID", (req, res) => {
    Department.findOneAndRemove({
      _id: req.params.deptID
    })
      .then(department => res.send(`${department.dept_name}Successfully deleted`))
      .catch(err => res.json(err));
});


module.exports = departments