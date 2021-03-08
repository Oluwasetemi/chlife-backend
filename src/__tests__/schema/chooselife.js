/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE-examples file in the root directory of this source tree.
 *
 * Copied and used by Natterbase Limited for the Equilibra Project.
 */

const { gql, makeExecutableSchema } = require('apollo-server-express');
const { readFileSync } = require('fs');
const { graphql, GraphQLSchema } = require('graphql');
const path = require('path');
const resolver = require('../../resolvers/index');

// import equilibraSchema from '../../setup/schema/index';
const typeDefs = readFileSync(
  path.join(__dirname, '..', '..', 'typeDefs.graphql'),
  'UTF-8'
);

const schema = new GraphQLSchema({
  ...typeDefs,
});

// const a = makeExecutableSchema({ typeDefs, schema });
// console.log(a);
// console.log(typeDefs);

async function chooselife(query) {
  // await app;
  const result = await graphql(schema, query);
  console.log('result');
  if (result.errors !== undefined) {
    throw new Error(JSON.stringify(result.errors, null, 2));
  }
  return result;
}

module.exports = chooselife;
