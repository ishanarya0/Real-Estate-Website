/**
* Module dependencies.
*/

var express = require('express')
  //, routes = require('./routes')
  , user = require('./routes/user')
  , userOffice = require('./routes/userOffice')
  , path = require('path');

  var router = express.Router();
//var methodOverride = require('method-override');
var session = require('express-session');
var app = express();
var { createConnection }      = require('mysql');
var bodyParser=require("body-parser");
var connection = createConnection({


        host: '35.213.189.162',
        user: 'staisaho_pink',
        password: 'dbmsproject2020', 
        database: 'staisaho_dbmsproject'
            });
 
connection.connect();
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: Date.now() + (30 * 86400 * 1000) }
            }))
app.use(express.static('public'));
// development only

app.get('/',user.home)
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
app.get('/login', user.index);//call for login page
app.post('/login', user.login);//call for login post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile',user.profile);//to render users profile


app.get('/signupOffice', userOffice.signup);//call for signup page
app.post('/signupOffice', userOffice.signup);//call for signup post 
app.get('/loginOffice', userOffice.index);//call for login page
app.post('/loginOffice', userOffice.login);//call for login post
app.get('/home/dashboardOffice', userOffice.dashboard);//call for dashboard page after login
app.get('/home/logoutOffice', userOffice.logout);//call for logout
app.get('/home/profileOffice',userOffice.profile);//to render users profile

var view_list = require('./routes/view_list');
app.use('/office/view', view_list );

var agnt_profile = require('./routes/a_profile');
app.use('/office/profile', agnt_profile );


app.use('/office/report', agnt_profile);

var prop_tran = require('./routes/prop_tran');
app.use('/office/prop_tran', prop_tran );

var add_agent = require('./routes/add_agent');
app.use('/office/add', add_agent);

var prop_trans = require('./routes/ag_prop_tran');
app.use('/agent/prop_tran', prop_trans );

var a_add = require('./routes/agent_add');
app.use('/agent/add', a_add);

var ag_view_list = require('./routes/ag_view_list');
app.use('/agent/view', ag_view_list );


//Middleware
app.listen(process.env.PORT || 8080)
