const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

require('./config/connection');

const indexRouter = require('./routes/index');
const projectsRouter = require('./routes/projects');
const contactRouter = require('./routes/contact');
const apiRouter = require('./routes/api');

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', engine({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/', projectsRouter);
app.use('/', contactRouter);
app.use('/', apiRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
