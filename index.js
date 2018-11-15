const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//var cors = require('cors');

// Create App.
const app = express();
// Connect Database.
mongoose.connect('mongodb://m_alaa:b01224589500@ds039311.mlab.com:39311/hospital'); //, { useNewUrlParser: true }
// middelware 
app.use(express.static('public')); // use public static files
//app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded {use in Login}
app.use(bodyParser.json());// parse application/json
app.use('/api', require('./routers/api'));
// Add headers
// app.use( (req, res, next) => {
//     // res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });
//app.use(cors({origin: 'http://localhost:3030'}));

app.use((err, req, res, next)=>{  // Error Middelware
    res.status(422).send({error: err.message});
});

// Part 
const part = process.env.PART || 3000;
app.listen(part, ()=>{
    console.log('done');
    console.log(mongoose.connection.readyState);
});
/**
 * Data Base To Used
 * db.hospitaldetails.insert({name:'homya',details:'findsdse',longitude:'2343434',latitude:'495065',type:'fddf',categories:'ddsdsd',review:[{nameUser:'mohamedalaa',rate:'5',comment:'finetodone',timeComment:'11sep2011'}],city:'alex',country:'egypt'}) 
 *
 */