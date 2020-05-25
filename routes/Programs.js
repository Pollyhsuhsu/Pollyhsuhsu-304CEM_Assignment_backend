const express = require("express")
const programs = express.Router()
const cors = require("cors")

const Program = require("../models/Program")
programs.use(cors())

/* Add programs */
programs.post("/createPgrm", (req, res) => {
    const today = new Date()
    const pgrmData = {
        pgrm_name: req.body.pgrm_name,
        dept_id: req.body.dept_id,
        dept_name: req.body.dept_name,
        pgrm_code: req.body.prgm_code,
        courses: req.body.courses,
        description: req.body.description,
        created: today
    }

    Program.findOne({
        pgrm_name: req.body.pgrm_name
    })
        .then(program => {
            if (!program) {
                Program.create(pgrmData)
                    .then(program => {
                        res.json({ status: program.pgrm_name + ' is created', prgm_id: program._id})
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.json({ error: 'Program already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

/* Get Course List*/
programs.get("/all", (req, res) => {
    Program.find({})
        .sort({ update_at: -1 })
        .then(programs => {
            setTimeout(() =>{
             res.json(programs);
            },1000)
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        });
})

/* Update Program Information*/
programs.put("/UpdatePrgm/:prgm_id", (req, res) => {
    Program.findOneAndUpdate({
        _id: req.params.prgm_id
    },{
        $set: {
            pgrm_name: req.body.pgrm_name,
            dept_id: req.body.dept_id,
            dept_name: req.body.dept_name,
            pgrm_code: req.body.prgm_code,
            courses: req.body.courses,
            description: req.body.description,
        }
    },
    {
        new: true
    }
    ).then(program => 
        setTimeout(() =>{
            res.json(program);
           },700)
        )
     .catch(err => res.json(err))
})

/* Query By Course ID */
programs.post("/queryPrgmbyID/:prgmID", (req, res) => {
    Program.findOne({
        _id: req.params.prgmID

    })
        .then(program => {
            const qPrgm = {
                pgrm_name: program.pgrm_name,
                dept_id: program.dept_id,
                dept_name: program.dept_name,
                pgrm_code: program.pgrm_code,
                courses: program.courses,
                description: program.description,
            }
            res.send(qPrgm)
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        });
})
module.exports = programs