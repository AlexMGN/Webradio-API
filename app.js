require('dotenv').config();
const express= require('express'),
    mySqlConnection = require('./src/database/mysql'),
    mongoose = require('mongoose'),
    user = require('./src/database/oauth')(mySqlConnection),
    token = require('./src/database/token')(mySqlConnection),
    oAuth2Server = require('node-oauth2-server'),
    oAuthModel = require('./src/authorisation/accessTokenModel')(user, token),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    { check } = require('express-validator'),
    path = require('path'),
    cors = require('cors'),
    app = express(),
    port = process.env.PORT || 3000;

/**
 * Uncomment this line for lunch scraping module
 * --
 * require('./src/utils/scraping');
 */
//require('./src/utils/scraping');

app.oauth = oAuth2Server({
    model: oAuthModel,
    grants: ['password'],
    debug: true
});

app.all('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const restrictedAreaRoutesMethods = require('./src/routes/restricted/restrictedAreaRoutesMethods'),
    restrictedAreaRoutes = require('./src/routes/restricted/restrictedAreaRoutes')(express.Router(), check, app, restrictedAreaRoutesMethods),
    authRoutesMethods = require('./src/routes/open/authRoutesMethodes')(user),
    authRoutes = require('./src/routes/open/authRoutes')(express.Router(), check, authRoutesMethods);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());

app.use(app.oauth.errorHandler());

app.use('/auth', authRoutes);
app.use('/authorized', restrictedAreaRoutes);

mongoose.connect(process.env.CONNECT_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then((database) => {
    console.log('Connected to MongoDB !');
    global.db = database
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
});

app.listen(port, function() {
    console.log('🚀 App listening on ' + port)
});

