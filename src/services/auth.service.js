'use strict';

const Joi = require('joi');
const jwt = require("jsonwebtoken");
const config = require("../../config/environment");

const generateAuthToken = (user) => {
 return jwt.sign({ _id: user._id }, config.privateKey, { expiresIn: '2d' } );
}

const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
    phone: Joi.string()
  };

  return Joi.validate(user, schema);
}

module.exports = {
  generateAuthToken,
  validateUser
}
