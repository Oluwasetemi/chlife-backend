require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');

(async () => {
  try {
    const { httpServer, server, app } = await createServer();

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
