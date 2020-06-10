/* eslint-disable */
const { ApolloServer, PubSub } = require('apollo-server-express');
const express = require('express');
const expressPlayground = require('graphql-playground-middleware-express').default;
const { readFileSync } = require('fs');
const { createServer } = require('http');
const path = require('path');
const dbConnection = require('./db');


const typeDefs = readFileSync(path.join(__dirname, 'typeDefs.graphql'), 'UTF-8');
if (!typeDefs) {
  console.log('Set up your typeDefs')
  return;
}
const Mutation = require('./resolvers/mutation');
const Query = require('./resolvers/query');
const Subscription = require('./resolvers/subscription');
const Type = require('./resolvers/type');


async function startServer() {

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
      },
      introspection: true,
      debug: false,
      context: ({req}) => ({ pubsub, db, req })
    });

    server.applyMiddleware({ app });

    app.get('/', (req, res) => {
        res.redirect('\graphiql')
    });

    app.get('/graphiql', expressPlayground({ endpoint: '/graphql' }));


    httpServer = createServer(app);
    server.installSubscriptionHandlers(httpServer);

    return {httpServer, server, app}
}

// exports.httpServer = httpServer;
module.exports = startServer;
