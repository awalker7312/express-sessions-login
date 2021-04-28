# express-sessions-login

A basic auth system utilizing nodejs, mongodb and express-sessions. Contains a user registration and login endpoint along with validation and password hashing.

## Install

```bash
# with npm
npm install

```

## Usage

You first must make sure you have a mongoDB server. You can use [MongoDB Cloud](https://www.mongodb.com/cloud).

Create a `.env` file in the root directory of your project. Add
environment-specific variables on new lines in the form of `NAME=VALUE`.
For example:

```dosini
DB_CONNECTION=<mongo db connection string>
SECRET_KEY=<secret key for cookie>
```

Start application

```bash
# with npm
npm start

```

Register initial user using the the formatted request in rest.http

Navigate to [http://localhost:3000](http://localhost:3000)


