import 'module-alias/register';
import express from 'express';
import '@/config/.';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from '@/gql/types/.';
import resolvers from '@/gql/resolvers/.';

const { APP_INTERNAL_PORT, DEV_HELLO, PROD_HELLO } = process.env;
const app = express();
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.get('/', (req, res) => {
  res.send('Hello World! ' + `${DEV_HELLO} ${PROD_HELLO}`);
});

app.listen(APP_INTERNAL_PORT, () => {
  console.info(`App listening on port ${APP_INTERNAL_PORT}`);
});
