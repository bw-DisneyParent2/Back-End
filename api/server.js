const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require('jsonwebtoken');
const session = require("express-session");
const sessionStore = require("connect-session-knex")(session);

const authRouter = require("../auth/auth-router");
const parentsRouter = require("../parents/parents-router");

const server = express();

const sessionOptions = {
    name: "ItsDangerousOut",
    secret: "TakeThis",
    cookie: {
      maxAge: 1000 * 60 * 30,
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
  
    store: new sessionStore({
      knex: require("../database/dbconfig"),
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 1000 * 60 * 30
    })
    };

  server.use(helmet());
  server.use(cors());
  server.use(express.json());
  
  server.get('/', (req, res) => {
    res.send("Backend for Disney Parents 2");
  }); 
  
  server.use(session(sessionOptions));
  server.use('/api/auth', authRouter);
  server.use('/api/parents', parentsRouter);

server.get('/token', (req, res) => {

    const payload = {
      subject: 'thisuser',
      parentid: 'parent.id',
      favoriteChili: 'red hot chili peppers'
    };

    const secret = 'takethis';
    const options = {
      expiresIn: '1h'
    };

    const token = jwt.sign(payload, secret, options);

    res.json(token);
});


module.exports = server;