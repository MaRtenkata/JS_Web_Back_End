const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database')
const reutesConfig = require('./config/routes')


const { init : storage } = require('./services/storage');

start();

async function start() {
  const env = process.env.NODE_ENV || 'developmnet'
  const port = 3000;

const app = express();

expressConfig(app);
await databaseConfig(app);

app.use(await storage());
reutesConfig(app);


app.listen(port, () => console.log(`Express running on port: ${port}...`));
}