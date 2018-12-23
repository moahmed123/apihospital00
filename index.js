const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');

// Create App.
const app = express();
// Connect Database.
mongoose.connect('mongodb://m_alaa:b01224589500@ds039311.mlab.com:39311/hospital', { useNewUrlParser: true });// Add Your Data Base.
// middelware 
app.use(express.static('public')); // use public static files
//app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded {use in Login}
app.use(bodyParser.json());// parse application/json

// // Add headers
// app.use( (req, res, next) => {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'https://dashboardmobile.herokuapp.com');
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   // Pass to next layer of middleware
//   next();
// });
// use it before all route definitions
app.use(cors({origin: 'https://dashboardmobile.herokuapp.com'}));

app.use('/api', require('./routers/api'));

// Port 
const port = process.env.PORT || 3000;
app.listen( port, () => {
    console.log('done');
    console.log(mongoose.connection.readyState);
});

/**
 * Data Base To Used
 * db.hospitaldetails.insert({name:'homya',details:'findsdse',longitude:'2343434',latitude:'495065',type:'fddf',categories:'ddsdsd',review:[{nameUser:'mohamedalaa',rate:'5',comment:'finetodone',timeComment:'11sep2011'}],city:'alex',country:'egypt'})
 */