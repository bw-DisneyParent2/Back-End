const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const sessionStore = require("connect-session-knex")(session);

const authenticate = require('../auth/authenticate-middleware');
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
        knex: require("../database/dbConfig.js"),
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

module.exports = server;