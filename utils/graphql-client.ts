import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://graphql.fauna.com/graphql';

export const graphQLClient = (token) => {
  
  console.info('graphQLClient:token', token)
  const secret = token || process.env.FAUNADB_SERVER_KEY;

  return new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${secret}`,
    },
  });
};
