const express = require('express');
const handlebars = require('express-handlebars');
const {about} = require('./controllers/about');
const {catalog} = require('./controllers/catalog');
const {create, post} = require('./controllers/create');
const {details} = require('./controllers/details');
const {notFound} = require('./controllers/notFound');
const { init } = require('./models/storage');

start();

async function start() {
    
const env = process.env.NODE_ENV || 'developmnet'
const port = 3000;

const app = express();

app.engine('.hbs', handlebars({
    extname: '.hbs'
  }))
app.set('view engine', '.hbs');
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));


app.use(await init())



app.get('/', catalog);
app.get('/about', about);
app.get('/details/:id', details);
app.get('/create', create);
app.post('/create', post);

app.all('*', notFound)


app.listen(port, () => console.log(`Express running on port: ${port}...`));
}