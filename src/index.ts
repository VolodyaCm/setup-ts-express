import 'module-alias/register';
import '@/config/.';
import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDb } from '@/db/.';
import { getCors, getGqlHTTP } from '@/lib/setup';

const { APP_INTERNAL_PORT, DEV_HELLO, PROD_HELLO } = process.env;
const app = express();

app.use(getCors());
app.use(cookieParser());
app.use('/graphql', getGqlHTTP());

app.get('/', (req, res) => {
  res.send('Hello World! ' + `${DEV_HELLO} ${PROD_HELLO}`);
});

const startServer = () =>
  app.listen(APP_INTERNAL_PORT, () => {
    console.info(`App listening on port ${APP_INTERNAL_PORT}`);
  });

connectDb((connection) => {
  connection.on('error', console.error.bind('Connection error: '));
  connection.on('disconnected', console.info);
  connection.on('open', startServer);
});
