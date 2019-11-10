const env = process.env.NODE_ENV || 'dev';

const dev = {
 app: {
   port: 3000
 },
 db: {
  name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS
 },
 privateKey: process.env.PRIVATE_KEY
};

const test = {
 app: {
   port: 3000
 },
 db: {
    username: '',
    password: ''
 }
};

const config = {
 dev,
 test
};

module.exports = config[env];
