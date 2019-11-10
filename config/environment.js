const env = process.env.NODE_ENV || 'dev';

const dev = {
 app: {
   port: 3000
 },
 db: {
  name: 'hackathon',
  username: 'sdzg',
  password: 'Intuit123'
 },
 privateKey: "myprivatekey"
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
