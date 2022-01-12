process.env.NODE_ENV = 'test';

var request = require('supertest');
const express = require('express');
const server = require('../app.js');
const chai = require('chai');
const app = express();

//var assert = chai.assert;    // Using Assert style
//var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
var xToken = "mockTest";

/* eslint-disable no-unused-vars, no-undef */


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
                    if (err) {
                      throw err;
                    }
                    done();
                });
        });
    });

    describe('Logging in to the home-page', function() {
        it('should return 302 from GET /', function(done) {
            request(server)
                .post('/')
                .send({username: "test1@test.com", password: "test123"})
                .end((err, res) => {
                    res.status.should.be.equal(302);
                    res.text.should.be.equal("Found. Redirecting to /map");
                    if (err) {
                      throw err;
                    }
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
                    if (err) {
                      throw err;
                    }
                    done();
                });
        });
    });

    describe('Registering through the register-page', function() {
        it('should redirect 302 from post /register', function(done) {
            request(server)
                .post('/register')
                .send({email: "test1@test.com", password: "test123",
                  firstname: "Test", lastname: "Testsson", cityid: 2})
                .end((err, res) => {
                    res.status.should.be.equal(302);
                    if (err) {
                      throw err;
                    }
                    done();
                });
        });
    });

    describe('Registering through the register-page', function() {
        it('should redirect 302 from post /register', function(done) {
            request(server)
                .post('/register')
                .send({email: "test1@test.com", password: "test123",
                  firstname: "Test", lastname: "Testsson", cityid: 2})
                .end((err, res) => {
                    res.status.should.be.equal(302);
                    if (err) {
                      throw err;
                    }
                    done();
                });
        });
    });

    describe('Bikes rental the map-page', function() {
        it('should render 200 from get /map', function(done) {
            request(server)
                .get('/map')
                .end((err, res) => {
                    res.status.should.be.equal(200);
                    if (err) {
                      throw err;
                    }
                    done();
                });
        });
    });

    describe('Bike rented call', function() {
        it('should render 200 from post /map', function(done) {
            request(server)
                .post('/map')
                .send({bikeId: "1bike"})
                .end((err, res) => {
                    res.status.should.be.equal(200);
                    if (err) {
                      throw err;
                    }
                    done();
                });
        });
    });

    describe('Bike end rent call', function() {
        it('should render 302 from post /rental', function(done) {
            request(server)
                .post('/rental')
                .send({bikeId: "1bike"})
                .end((err, res) => {
                    res.status.should.be.equal(302);
                    if (err) {
                      throw err;
                    }
                    done();
                });
        });
    });


    after(function(done) {
        done();
    });
});
/* eslint-disable no-unused-vars, no-undef */
