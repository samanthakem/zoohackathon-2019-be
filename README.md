# Zoo Hackathon 2019

Problem Statement #9

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.4.0

## Install

    Fork the project `https://github.com/samanthakem/zoohackathon-2019-be`

    $ git clone git@github.com:<YOUR-USER>/zoohackathon-2019-be.git
    $ cd zoohackathon-2019-be
    $ npm i

## Running the project

    $ npm run start

## Endpoints

Note: for all the requests you need to pass the Bearer token to be authenticated.

`POST /user`
 - name: String
 - email: String
 - password: String
 - phone: String

 It returns a Bearer token.

`GET /user`
It returns the current user id.

`POST /event`
 - start: String (yyyy-mm-dd)
 - end: String (yyyy-mm-dd)
 - radius: Double
 - lat: Integer
 - long: Integer
It returns the newly created event.

`GET /events`
 - start: String (yyyy-mm-dd)
 - end: String (yyyy-mm-dd)
 - radius: Double
 - lat: Integer
 - long: Integer
 - keyword: String
It returns all the events with the parameters above.

`DELETE
