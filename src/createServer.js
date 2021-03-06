/* eslint-disable */
const { ApolloServer, PubSub, gql } = require('apollo-server-express');
const { ApolloServerPluginSchemaReporting } = require('apollo-server-core');
const express = require('express');
const expressPlayground = require('graphql-playground-middleware-express')
  .default;
const remark = require('remark');
const recommended = require('remark-preset-lint-recommended');
const html = require('remark-html');
const report = require('vfile-reporter');
const { readFileSync } = require('fs');
const { createServer } = require('http');
const { altairExpress } = require('altair-express-middleware');
const path = require('path');

const dbConnection = require('./db');
const cors = require('cors');
const { verify } = require('./utils/auth');
const { findUserById } = require('./services/user');
const resolvers = require('./resolvers');
const ContentfulAPI = require('./utils/data-source/contentful');
const WgerdeAPI = require('./utils/data-source/wgerde');

const typeDefs = readFileSync(
  path.join(__dirname, 'typeDefs.graphql'),
  'UTF-8',
);

const defaultQueries = readFileSync(
  path.join(__dirname, '..', 'all_development_queries.graphql'),
  'UTF-8',
);

if (!typeDefs) {
  console.log('Set up your typeDefs');
  // return;
}

async function startServer() {
  // setup the db
  let dbUrl = process.env.DATABASE_URL;
  if (process.env.NODE_ENV === 'test') {
    dbUrl = process.env.DATABASE_TEST_URL;
  }

  if (process.env.NODE_ENV === 'development') {
    process.env.FRONTEND_URL = process.env.FRONTEND_URL;
  }
  // setup the database
  const db = dbConnection(dbUrl);

  // set up the express app
  const app = express();

  // Send it an object with typeDefs(the schema) and resolvers
  const pubsub = new PubSub();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    debug: false,
    context: ({ req }) => ({ pubsub, db, req }),
    dataSources: () => {
      return {
        contentfulAPI: new ContentfulAPI(),
        wgerdotdeAPI: new WgerdeAPI(),
      };
    },
    plugins: [ApolloServerPluginSchemaReporting()],
  });

  httpServer = createServer(app);
  server.installSubscriptionHandlers(httpServer);

  // setup middleware using the app
  const corsOptions = {
    credentials: true,
    origin: '*',
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  // TODO: Use express middleware to populate current user (JWT)
  // 2. create a middleware that populates the user in the request
  app.use(async (req, res, next) => {
    try {
      const { authorization: token } = req.headers;

      if (token) {
        const { id } = await verify(token);

        // check validity of the user id
        const user = await findUserById(id);

        if (!user) return next();

        req.userId = id;
        req.user = user;
      }
      next()
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        // throw new Error("Please login");
        return res.status(401).json({errors: error,data: null})
        // next(error);
      }
      console.log(error)
      res.status(401).json({...error})
    }
  });

  server.applyMiddleware({ app });

  app.get('/', (req, res) => {
    res.redirect('graphiql');
  });

  app.get('/graphiql', expressPlayground({ endpoint: '/graphql' }));

  // Mount your altair GraphQL client
  app.use(
    '/altair',
    altairExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://localhost:4000/subscriptions`,
      initialQuery: defaultQueries,
    }),
  );

  app.get('/changelog', async (req, res) => {
    // read file
    const changeLogString = await readFileSync(
      path.join(__dirname, '..', 'changelog.md'),
      'UTF-8',
    );
    // parse the string of the file to html
    remark()
      .use(recommended)
      .use(html)
      .process(changeLogString, function(err, file) {
        console.error(report(err || file));
        // console.log(String(file))
        // output the changelog html
        const htmlFile = String(file);
        return res.send(String(file));
      });
  });

  // error handler

  return { httpServer, server, app };
}

// exports.httpServer = httpServer;
module.exports = startServer;
