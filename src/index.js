require('dotenv').config({ path: 'variables.env' });
const cors = require('cors');
const { verify } = require('./utils/auth');
const createServer = require('./createServer');
const { findUserById } = require('./services/user');

(async () => {
  try {
    const { httpServer, server, app } = await createServer();

    // setup middleware using the app
    const corsOptions = {
      credentials: true,
      origin: process.env.FRONTEND_URL,
      optionsSuccessStatus: 200
    };

    app.use(cors(corsOptions));

    // TODO: Use express middleware to populate current user (JWT)
    app.use(async (req, res, next) => {
      const { token } = req.headers;

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
      const user = await findUserById(req.id);
      req.user = user;
      next();
    });

    httpServer.listen(
      {
        port: process.env.PORT || 4000
      },
      () =>
        console.log(
          `GraphQL Server running at http://localhost:${process.env.PORT}${server.graphqlPath} and socket is running at ws://localhost:${process.env.PORT}/graphql`
        )
    );
  } catch (e) {
    console.error(e.stack);
    console.log(e.message);
  }
})();
