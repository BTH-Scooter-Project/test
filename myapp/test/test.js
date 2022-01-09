process.env.NODE_ENV = 'test';

var request = require('supertest');
const express = require('express');
const server = require('../app.js');
const chai = require('chai');
const app = express();

var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style


/* eslint-disable no-unused-vars, no-undef */
let currentResponse = null;

describe('Core controller unit tests:', function() {
    describe('Loading the home-page', function() {
        it('should return 200 from GET /', function(done) {
            request(server)
            .get('/')
            .end((err, res) => {
                res.status.should.be.equal(200);
                res.text.should.match(/name="username"/);
                res.text.should.match(/name="password"/);
                res.text.should.match(/action="[/]"/);
                done();
            });
        });
    });

    describe('Loading the register-page', function() {
        it('should return 200 from GET /register', function(done) {
            request(server)
            .get('/register')
            .end((err, res) => {
                res.status.should.be.equal(200);
                res.text.should.match(/name="username"/);
                res.text.should.match(/name="password"/);
                res.text.should.match(/action="[/]register"/);
                done();
            });
        });
    });

    afterEach(function() {
        //console.log(currentResponse);
    });

    after(function(done) {
        done();
    });
});
/* eslint-disable no-unused-vars, no-undef */
