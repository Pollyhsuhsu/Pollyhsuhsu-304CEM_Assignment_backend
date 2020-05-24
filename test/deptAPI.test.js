const mongoose = require('mongoose');
const chai = require('chai');  
const expect = chai.expect;
const chaihttp = require('chai-http')

const server = require('../server');
const supertest = require('supertest');
const api = supertest('http://localhost:5000');
let should = chai.should();

chai.use(chaihttp);
const Department = require("../models/Department")
let deptid;

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

describe('DepartmentAPI', () => {
    it('All Department should be an object with keys and values', (done) => {
      api.get('/departments/all') // test all user
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.body[0]).to.have.property('dept_name');
          expect(res.body[0].dept_name).to.be.a('string');
          expect(res.body[0]).to.have.property('dept_head_id');
          expect(res.body[0].dept_head_id).to.be.a('string');
          expect(res.body[0]).to.have.property('dept_head_name');
          expect(res.body[0].dept_head_name).to.be.a('string');
          done();
        });
    });

    it('Create a Department', (done) => {
        const dept = {
            dept_name: "Test",
            dept_head_name: "Test",
        }    
        api.post('/departments/createDept') // test register user
          .send(dept)
          //.expect({status:user.email+ ' registered',userID: user._id}, done);
          .expect(200)
          .end((err, res) => {
            deptid = res.body.deptID
            //expect({status:res.body.status, userID: res.body.userID}, done)
            done();
          });
    });

     it('Query a department by department ID', (done) => {
      api.post(`/departments/queryDeptbyID/${deptid}`) 
        .expect(200)
        .end((err, res) => {
          //expect({status:res.body.status, userID: res.body.userID}, done)
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('Update a department by department ID', (done) => {
        const updateDept = {
            dept_name: "Test2",
            dept_head_name: "Test2",
        }
        api.put(`/departments/UpdateDept/${deptid}`) 
        .send(updateDept)
          .expect(200)
          .end((err, res) => {
            if(err){
             return done(err);
            }
            done();
          });
    });

    it('Delete a Department', (done) => { 
        //  mongoose.set(useFindAndModify,false)
          api.delete(`/departments/delDeptbyID/${deptid}`) 
            .expect(200).end(done)
    });
});