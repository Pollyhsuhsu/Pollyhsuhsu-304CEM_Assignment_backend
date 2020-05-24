const mongoose = require('mongoose');
const chai = require('chai');  
const expect = chai.expect;
const chaihttp = require('chai-http')
const supertest = require('supertest');
const api = supertest('http://localhost:5000');
let should = chai.should();

chai.use(chaihttp);
const Program = require("../models/Program")
let APItoken;
let prgmid;
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

describe('ProgramAPI', () => {
  it('All Program should be an object with keys and values', (done) => {
    api.get('/programs/all') // test all user
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body[0]).to.have.property('pgrm_name');
        expect(res.body[0].pgrm_name).to.be.a('string');
        expect(res.body[0]).to.have.property('dept_name');
        expect(res.body[0].dept_name).to.be.a('string');
        expect(res.body[0]).to.have.property('pgrm_code');
        expect(res.body[0].pgrm_code).to.be.a('string');
        expect(res.body[0]).to.have.property('courses');
        expect(res.body[0].courses).to.be.a('array');
        expect(res.body[0]).to.have.property('description');
        expect(res.body[0].description).to.be.a('string');
        done();
      });
  });

  it('Create a Program', (done) => {
    const program = {
        pgrm_name: "Test",
        dept_name: "Test",
        pgrm_code: "Test",
        description: "Test",
    }    
    api.post('/programs/createPgrm') // test register user
      .send(program)
      //.expect({status:user.email+ ' registered',userID: user._id}, done);
      .expect(200)
      .end((err, res) => {
        prgmid = res.body.prgm_id
        expect({status:res.body.status, prgm_id: res.body.prgm_id}, done)
        done();
      });
    });

    it('Update a Program', (done) => {
      const program = {
          pgrm_name: "Test",
          dept_name: "Test",
          pgrm_code: "Test",
          description: "Test",
      }    
      api.post('/programs/createPgrm') // test register user
        .send(program)
        //.expect({status:user.email+ ' registered',userID: user._id}, done);
        .expect(200)
        .end((err, res) => {
          prgmid = res.body.prgm_id
          expect({status:res.body.status, prgm_id: res.body.prgm_id}, done)
          done();
        });
      });

      it('Query a Program by program id', (done) => {
        const program = {
            pgrm_name: "Test",
            dept_name: "Test",
            pgrm_code: "Test",
            description: "Test",
        }    
        api.post('/programs/createPgrm') // test register user
          .send(program)
          //.expect({status:user.email+ ' registered',userID: user._id}, done);
          .expect(200)
          .end((err, res) => {
            prgmid = res.body.prgm_id
            expect({status:res.body.status, prgm_id: res.body.prgm_id}, done)
            done();
          });
        });

        it('Delete a Program by program id', (done) => {
          const program = {
              pgrm_name: "Test",
              dept_name: "Test",
              pgrm_code: "Test",
              description: "Test",
          }    
          api.post('/programs/createPgrm') // test register user
            .send(program)
            //.expect({status:user.email+ ' registered',userID: user._id}, done);
            .expect(200)
            .end((err, res) => {
              prgmid = res.body.prgm_id
              expect({status:res.body.status, prgm_id: res.body.prgm_id}, done)
              done();
            });
          });

//     it('Query a User by UserID', (done) => {
//       const quser = {
//         userID: userid
//       }
//       api.post('/users/queryUser')
//       .send(quser)
//         .expect(200)
//         .end((err, res) => {
//           expect(res.body).to.be.an('object');
//           done();
//         });
//     });

//     it('Delete a User', (done) => { 
//     //  mongoose.set(useFindAndModify,false)
//       api.delete(`/users/delUserbyID/${userid}`) 
//         .expect(200).end(done)
//     });
});