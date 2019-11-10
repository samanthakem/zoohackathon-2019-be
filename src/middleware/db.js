const assert = require("assert");
const client = require("mongodb").MongoClient;
const config = require("../../config/environment");

let uri = `mongodb+srv://${config.db.username}:${config.db.password}@cluster0-evtwo.mongodb.net/test?retryWrites=true&w=majority`;

let _db;

const initDatabase = (callback) => {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }

    const connected = (err, db) => {
        if (err) {
            return callback(err);
        }
        console.log("DB initialized - connected to: " + uri);
        _db = db;
        return callback(null, _db);
    }

    client.connect(uri, { useNewUrlParser: true }, connected);
    }

const getDatabase = () => {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db.db(config.db.name);
}

module.exports = {
    getDatabase,
    initDatabase
};
