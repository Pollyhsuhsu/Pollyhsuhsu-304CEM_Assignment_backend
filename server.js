var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
var mongoose = require("mongoose")
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

const mongoURI = 'mongodb://localhost:27017/Attendance'

mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

var Users = require("./routes/Users")
var Departments = require("./routes/Departments")
var Courses = require("./routes/Courses")
var Programs = require("./routes/Programs")
var Classes = require("./routes/Classes")
var Attendances = require("./routes/Attendances")
var Email = require("./routes/Email")

app.use("/users", Users)
app.use("/departments", Departments)
app.use("/courses", Courses)
app.use("/programs", Programs)
app.use("/classes", Classes)
app.use("/attendances", Attendances)
app.use("/email", Email)

app.listen(port, function () {
    console.log("Server is running on port: " + port)
})