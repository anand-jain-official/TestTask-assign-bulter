const request = require('supertest');
const { app } = require('../index');

describe('POST /assign-butlers', function() {
    it('responds with json of butlers assigned', function(done) {
      request(app)
        .post('/assign-butlers')
        .send({
          requests: JSON.stringify([
            {
                clientId: 1,
                requestId: 'abc',
                hours: 6
            },
            {
                clientId: 2,
                requestId: 'ghi',
                hours: 1
            },
            {
                clientId: 1,
                requestId: 'def',
                hours: 4
            },
            {
                clientId: 1,
                requestId: 'zzz',
                hours: 2
            }
            ])
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {"butlers":[{"requests":["abc","ghi"],"remainingHours":1},{"requests":["def","zzz"],"remainingHours":2}],"spreadClientIds":[1,2]} ,done);
    });

    it('a request of hours greater than 8', function(done) {
      request(app)
        .post('/assign-butlers')
        .send({
          requests: JSON.stringify([
            {
                clientId: 1,
                requestId: 'abc',
                hours: 21
            },
            {
                clientId: 2,
                requestId: 'ghi',
                hours: 1
            },
            {
                clientId: 1,
                requestId: 'def',
                hours: 4
            },
            {
                clientId: 1,
                requestId: 'zzz',
                hours: 2
            }
            ])
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {"butlers":[{"requests":["abc"],"remainingHours":0},{"requests":["abc"],"remainingHours":0},{"requests":["abc","ghi","zzz"],"remainingHours":0},{"requests":["def"],"remainingHours":4}],"spreadClientIds":[1,2]} ,done);
    });
  });