/* eslint-disable */
const { ApolloServer, PubSub } = require('apollo-server-express');
const express = require('express');
const expressPlayground = require('graphql-playground-middleware-express').default;
const { readFileSync } = require('fs');
const { createServer } = require('http');
const path = require('path');

const dbConnection = require('./db');
const cors = require('cors');
const { verify } = require('./utils/auth');
const { findUserById } = require('./services/user');


const typeDefs = readFileSync(path.join(__dirname, 'typeDefs.graphql'), 'UTF-8');
if (!typeDefs) {
  console.log('Set up your typeDefs')
  return;
}
const Mutation = require('./resolvers/mutation');
const Query = require('./resolvers/query');
const Subscription = require('./resolvers/subscription');
// const Type = require('./resolvers/type');


async function startServer() {
  try {
    // setup the db
    let dbUrl = process.env.DATABASE_URL;
    if (process.env.NODE_ENV === 'test') {
      dbUrl = process.env.DATABASE_TEST_URL;
    }
    // setup the database
    const db = dbConnection(dbUrl);

    // set up the express app
    const app = express();

    // Send it an object with typeDefs(the schema) and resolvers
    const pubsub = new PubSub();
    const server = new ApolloServer({
      typeDefs,
      resolvers: {
        Query,
        Mutation,
        // Subscription
        // Type,
      },
      introspection: true,
      debug: false,
      context: ({req}) => ({ pubsub, db, req })
    });


      // setup middleware using the app
    const corsOptions = {
      credentials: true,
      origin: '*',
      optionsSuccessStatus: 200
    };

    app.use(cors(corsOptions));

    // TODO: Use express middleware to populate current user (JWT)
    app.use(async (req, res, next) => {
      const { authorization: token } = req.headers;

      if (token) {
        const { id } = await verify(token);
        req.userId = id;
      }
      next();
    });

    // 2. create a middleware that populates the user in the request
    app.use(async (req, res, next) => {
      // if they aren't logged in, skip this
      if (!req.userId) return next();
      const user = await findUserById(req.userId);
      req.user = user;
      next();
    });

    server.applyMiddleware({ app });

    app.get('/', (req, res) => {
        res.redirect('\graphiql')
    });

    app.get('/graphiql', expressPlayground({ endpoint: '/graphql' }));


    httpServer = createServer(app);
    server.installSubscriptionHandlers(httpServer);

    return {httpServer, server, app}
  } catch (error) {
    console.log(error.stack)
    throw new Error(error.message);
  }

}

// exports.httpServer = httpServer;
module.exports = startServer;
