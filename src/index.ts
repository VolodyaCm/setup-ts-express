import express from 'express';
import './config';

const { APP_INTERNAL_PORT, DEV_HELLO, PROD_HELLO } = process.env;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World! ' + `${DEV_HELLO} ${PROD_HELLO}`);
});

app.listen(APP_INTERNAL_PORT, () => {
  console.info(`App listening on port ${APP_INTERNAL_PORT}`);
});
