const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.get("/all", (req, res) => {
    User.find({})
        .sort({ update_at: -1 })
        .then(users => {
            setTimeout(() =>{
             res.json(users);
            },1000)
        })
        .catch(err => {;
            res.json(err);
        });
})

users.post("/register", (req, res) => {
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        HKID: req.body.HKID,
        type: req.body.type,
        password: req.body.password,
        phone_no: req.body.phone_no,
        address: req.body.address,
        e_c_person: req.body.e_c_person,
        e_c_person_no: req.body.e_c_person_no,
        bith_data: req.body.bith_data,
        gender: req.body.gender,
        photo: req.body.photo,
        created: today
    }
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => { res.status(201).json({ status: user.email + ' registered', userID: user._id, message: 'User created!' }) })
                        .catch(err => { res.send('error: ' + err) })
                })
            } else {res.json({ error: 'User already exists' }) }
        })
        .catch(err => { res.send('error: ' + err) })
})

users.put("/updatePassword", (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    console.log(userData);
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        userData.password = hash
        User.findOneAndUpdate({
            email: userData.email,
        },{
            $set: {
                password: userData.password,
            }
        },
        {
            new: true
        }
        ).then(user => res.json(user))
         .catch(err => res.json(err))
    })
})

users.post("/queryUser", (req, res) => {
    User.findOne({
        _id: req.body.userID
        //this.$route.query.userID
    })
        .then(user => {
            const qUser = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                HKID: user.HKID,
                type: user.type,
                phone_no: user.phone_no,
                address: user.address,
                e_c_person: user.e_c_person,
                e_c_person_no: user.e_c_person_no,
                bith_data: user.bith_data,
                gender: user.gender,
                photo: user.photo,
            }
            res.send(qUser)
        })
})

users.put("/updateUser/:id", (req, res) => {
    User.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            HKID: req.body.HKID,
            type: req.body.type,
            phone_no: req.body.phone_no,
            address: req.body.address,
            e_c_person: req.body.e_c_person,
            e_c_person_no: req.body.e_c_person_no,
            bith_data: req.body.bith_data,
            gender: req.body.gender,
            photo: req.body.photo
        }
    },
    {
        new: true
    }
    ).then(user => res.json(user))
     .catch(err => res.json(err))
})

users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        HKID: user.HKID,
                        type: user.type,
                        phone_no: user.phone_no,
                        address: user.address,
                        e_c_person: user.e_c_person,
                        e_c_person_no: user.e_c_person_no,
                        bith_data: user.bith_data,
                        gender: user.gender,
                        photo: user.photo
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.json({ error: 'Incorrect account or password' })
                }
            } else {res.json({ error: 'Incorrect account or password' }) }
        })
        .catch(err => { res.send('error: ' + err) })
})

users.delete("/delUserbyID/:userID", (req, res) => {
    User.findOneAndRemove({
      _id: req.params.userID
    })
      .then(user => res.send(`${user.first_name}Successfully deleted`))
      .catch(err => res.json(err));
  });

module.exports = users
