const assert = require("chai").assert;
const index = require("../index")
//H:\Course 273 Prof Simon Shim\Lab 1 Uber Eats\server\index.js
const chai = require("chai");
chai.use(require("chai-http"));
const expect = require("chai").expect;
const agent = require("chai").request.agent(index);
const router = require("express").Router();


describe("UberEats", function () {
  describe("Customer Login Test", function () {
    it("should return 'Invalid Credentails' when the username and password combination is incorrect", () => {
      agent
        .post("/uber-eats/api/LandingPage")
        .send({ useremail: "akshay01@gmail.com", userpassword: "admin1234" })
        .then(function (res) {
          expect(res.text).to.include("Invalid Credentials");
        })
        .catch((error) => {
          console.log(error);
          assert.fail("An error occured. Please check the logs");
        });
    });


    it("should return user details when the username and password are correct", () => {
      agent
        .post("/uber-eats/api/LandingPage")
        .send({ useremail: "akshay01@gmail.com", userpassword: "admin" })
        .then(function (res) {
          expect(res.text).to.include('akshay01@gmail.com');
        })
        .catch((error) => {
          console.log(error);
          assert.fail("An error occured. Please check the logs")
        });
    });
  });   

   describe("Restaurant Login Test", function () {
    it("should return 'Invalid Credentails' when the Restaurant email and password combination is incorrect", () => {
      agent
        .post("/uber-eats/api/RestaurantUser")
        .send({ useremail: "bake@gmail.com", userpassword: "password" })
        .then(function (res) {
          expect(res.text).to.include("Invalid Credentials");
        })
        .catch((error) => {
          console.log(error);
          assert.fail("An error occured. Please check the logs");
        });
    });

    it("should return Restaurant Email details when the Restaurant email and password are correct", () => {
        agent
          .post("/uber-eats/api/RestaurantUser")
          .send({ useremail: "bake@gmail.com", userpassword: "admin" })
          .then(function (res) {
            expect(res.text).to.include('bake@gmail.com');
          })
          .catch((error) => {
            console.log(error);
            assert.fail("An error occured. Please check the logs")
          });
      });
    });   
  
});

module.exports = router;