require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');

(async () => {
  const { httpServer, server } = await createServer();

  if (process.env.NODE_ENV !== 'test') {
    httpServer.listen(
      {
        port: process.env.PORT || 4000,
      },
      () =>
        /* eslint-disable */
        console.log(
          `GraphQL Server running at http://localhost:${process.env.PORT}${
            server.graphqlPath
          } and socket is running at ws://localhost:${process.env.PORT}${
            server.graphqlPath
          }`,
        ),
      /* eslint-enable */
    );
  }
})();
