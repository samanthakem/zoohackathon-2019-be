'use strict';
const database = require("../middleware/db").getDatabase;
const ObjectID = require("mongodb").ObjectID;
const validateUser = require("../services/auth.service").validateUser;
const generateAuthToken = require("../services/auth.service").generateAuthToken;
const bcrypt = require("bcrypt");
const _ = require("lodash");

exports.current = (req, res) => {
    const collection = database().collection("users");
    collection.findOne({ _id: new ObjectID(req.user._id) }, {_id: 0, name: 0 }).then((data) => {
        delete data.password;
        delete data.roles;
        res.send(data);
    });
};

exports.create = async (req, res, next) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const collection = database().collection("users");
    collection.findOne({ email: req.body.email }).then((data) => {
        if (!_.isEmpty(data)) return res.status(400).send("User already registered.");
    });

    let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roles: ["USER"]
    }
    newUser.password = await bcrypt.hash(newUser.password, 10);
    collection.insertOne(newUser, function(err) {
        if (err) throw err;
        console.log("User has been created!");
        res.status(200).send({
            token: generateAuthToken(newUser)
        })
    });
};
