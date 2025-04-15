import 'dotenv/config';
import express from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import { MONGODB_URI } from './config/connection.js';
import apiRoutes from './routes/apiRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import htmlRoutes from './routes/htmlRoutes.js';
import { format } from 'date-fns'; 
import methodOverride from 'method-override';

const app = express();

const store = new (MongoDBStore(session))({
  uri: MONGODB_URI,
  collection: 'sessions',
});

store.on('error', (error) => console.log(error));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use((req, res, next) => {
  res.locals.isLoggedIn = !!req.session.userId;
  next();
});

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

const hbs = exphbs.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers: {
    eq: (a, b) => a.toString() === b.toString(),
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(methodOverride('_method'));

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);
app.use('/events', eventRoutes);

export default app;
