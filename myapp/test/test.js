var request = require('supertest');
const express = require('express');

const app = express();

app.get('/', function(req, res) {
  res.status(200);
});

describe('Core controller unit tests:', function() {
    before(function(done) {
        request = request('http://localhost:1338');

        done();
    });

    describe('Loading the homepage', function() {
        it('should return 200 from GET /', function(done) {
            request
                .get('/')
                .expect('Content-Type', 'text/html; charset=utf-8')
                .expect(200, done);
        });
    });

    after(function(done) {
        done();
    });
});
