const request = require('supertest');
const app = require('../routes/Users');

describe('GET /user', () => {
    it('returns a json response containing the users', () => request(app)
    .get('all')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
        console.log(response);
    }));
})