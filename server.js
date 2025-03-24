const express = require('express');
const app = express();
const routes = require('./routes');
const { engine } = require('express-handlebars');
const path = require('path');
const db = require('./config/connection'); 

app.engine('handlebars', engine({
  defaultLayout: 'main',
  extname: '.handlebars'
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
