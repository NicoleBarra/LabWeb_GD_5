// Imports
const express = require('express');
const webRoutes = require('./routes/web');
var cors = require('cors')

// Express app creation
const app = express();

// Configurations
const appConfig = require('./configs/app');

// View engine configs
const exphbs = require('express-handlebars');
const hbshelpers = require("handlebars-helpers");
const multihelpers = hbshelpers();
const extNameHbs = 'hbs';
const hbs = exphbs.create({
  extname: extNameHbs,
  helpers: multihelpers
});
app.engine(extNameHbs, hbs.engine);
app.set('view engine', extNameHbs);
app.use(express.static('public'));

// Receive parameters from the Form requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Sobreescribe el método de envío
let methodOverride = require('method-override')
// sobreescribe el método POST
app.use(methodOverride('_method'))

// Routes
app.use('/', webRoutes);

// App init
app.listen(appConfig.expressPort, () => {
  console.log(`Server is listenning on ${appConfig.expressPort}! (http://localhost:${appConfig.expressPort})`);
});
