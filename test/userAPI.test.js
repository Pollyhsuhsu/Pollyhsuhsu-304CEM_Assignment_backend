const mongoose = require('mongoose');
const chai = require('chai');  
const expect = chai.expect;
const chaihttp = require('chai-http')
const supertest = require('supertest');
const api = supertest('http://localhost:5000');
let should = chai.should();

chai.use(chaihttp);
const User = require("../models/User")
let APItoken;
let userid;
before((done) => {
  api.post('/users/login') // Test Login
    .set('Accept', 'application/json')
    .send({
      user_mail: 'Admin',
      user_password: '123123'
    })
    .expect(200)
    .end((err, res) => {
      APItoken = res.body.token;
      done();
    });
});

describe('UserAPI', () => {
  it('All User should be an object with keys and values', (done) => {
    api.get('/users/all') // test all user
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body[0]).to.have.property('first_name');
        expect(res.body[0].first_name).to.be.a('string');
        expect(res.body[0]).to.have.property('last_name');
        expect(res.body[0].last_name).to.be.a('string');
        expect(res.body[0]).to.have.property('email');
        expect(res.body[0].email).to.be.a('string');
        expect(res.body[0]).to.have.property('password');
        expect(res.body[0].password).to.be.a('string');
        expect(res.body[0]).to.have.property('phone_no');
        expect(res.body[0].phone_no).to.be.a('number');
        expect(res.body[0]).to.have.property('address');
        expect(res.body[0].address).to.be.a('string');
        expect(res.body[0]).to.have.property('photo');
        expect(res.body[0].photo).to.be.a('string');
        done();
      });
  });
  it('Create a User', (done) => {
    const user = {
        first_name: "Test",
        last_name: "Test",
        email: "Test",
        HKID: "Test",
        type: "Test",
        password: "Test",
        phone_no: "123456",
        address: "Test",
        e_c_person: "Test",
        e_c_person_no: "123456",
        bith_data: "1992-10-26",
        gender: "Test"
    }    
    api.post('/users/register') // test register user
      .send(user)
      //.expect({status:user.email+ ' registered',userID: user._id}, done);
      .expect(200)
      .end((err, res) => {
        userid = res.body.userID
        expect({status:res.body.status, userID: res.body.userID}, done)
        done();
      });
    });

    it('Query a User by UserID', (done) => {
      const quser = {
        userID: userid
      }
      api.post('/users/queryUser')
      .send(quser)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('Delete a User', (done) => { 
    //  mongoose.set(useFindAndModify,false)
      api.delete(`/users/delUserbyID/${userid}`) 
        .expect(200).end(done)
    });
});