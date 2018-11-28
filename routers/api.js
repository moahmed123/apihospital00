const express  = require('express');
const router   = express.Router();
const contact  = require('../models/hospitalContent');
const GeoPoint = require('geopoint');

// GET - Data Hotels
router.get('/Allhotel',(req, res, next) => {   
    contact.find({}).then((dataHotels) => {
        res.status(200).send({dataHotels : dataHotels});                
    }).catch(next);
});
// GET - By Id Data Hotels
router.get('/hotelid',(req, res, next) => {
    hotelId = req.query["id"];
    contact.findById(hotelId).then((dataHotels) => {
        res.status(200).send({dataHotels : dataHotels});                
    }).catch(next);
});
// post - By Id Data Hotels
router.post('/addhospital',(req, res, next) => {    
    /*
     ** name, address, details, longitude, latitude, type, categories, 
     ** review, city, country 
     */
    Insertname       = req.query['name'];
    Insertdetails    = req.query['details'];
    Insertlongitude  = req.query['longitude'];
    Insertlatitude   = req.query['latitude'];
    Inserttype       = req.query['type'];
    Insertcategories = req.query['categories'];
    Insertactivation = req.query['activation'];
    Insertphone      = req.query['phone'];
    Insertcity       = req.query['city'];
    Insertcountry    = req.query['country'];   

    contact.create(
        {name: Insertname,
        details: Insertdetails,
        loc:{
            longitude:Insertlongitude,
            latitude:Insertlatitude
        },        
        type: Inserttype,
        categories: Insertcategories,
        city: Insertcity,
        phone: Insertphone,
        activation: Insertactivation,
        country: Insertcountry}).then((dataHotels) => {
        res.status(200).send({dataHotels : dataHotels, create: true});
    }).catch(next);
});
/** 
 ** GET - By namehotels use fine to show all like this name.
 ** fineOne show one hotel like it. 
 **/
router.get('/hotel',(req, res, next) => {
    hospitalName  = req.query["name"];                 
    hotelLimit = req.query["limit"];
    hospitalcity = req.query["city"];
    hospitalLng = req.query["lng"];
    hospitalLat = req.query["lat"];
    // year: { $gte: 1980, $lte: 1989 } .reverse().
    /**
     * show all by name ---> http://localhost:3000/api/hotel?name=all & limit=number & city= all
     * search by name   ---> http://localhost:3000/api/hotel?name=name & limit=number
     * search by city   ---> http://localhost:3000/api/hotel?city=alexandria & limit=number  
     * search by name and city ---->http://localhost:3000/api/hotel?name=name&city=city   
     */
    // Show All hospital By Name.
    if(hospitalName == 'all'){
        contact.find({}).then((AllDatahotels) => {            
            res.status(200).send({
                hotels : AllDatahotels.slice(0,hotelLimit),
                count  : AllDatahotels.length
            });
        }).catch(next);
    // search By Name Look Like this Name
    }else if (hospitalName != 'all' && !hospitalcity || hospitalcity == 'all'){        
        contact.find({name: new RegExp('^' + hospitalName + '$', "i")}).then((dataHotels) => {
            res.status(200).send({
                dataHotels : dataHotels.slice(0,hotelLimit),
                countName  : dataHotels.length
            });                
        }).catch(next);
    // Show All hospital By City.
    }else if(hospitalcity != 'all' && !hospitalName ){
        // Search For Hotels By Name.
        contact.find({city: new RegExp('^' + hospitalcity + '$', "i")}).then((data) => {
            res.status(200).send({
                datahospital : data.slice(0,hotelLimit),
                countCity    : data.length
            });                
        }).catch(next);
    }else if(hospitalcity != 'all' && hospitalName != 'all' ){
        // Search For Hotels By Name.
        contact.find({
            name: new RegExp('^' + hospitalName + '$', "i"),
            city: new RegExp('^' + hospitalcity + '$', "i")
        }).then((data) => {
            res.status(200).send({
                datahospital : data.slice(0,hotelLimit),
                countCity    : data.length
            });                
        }).catch(next);
    } 
    // year: { $gte: 1980, $lte: 1989 } .reverse().
    
    if(hospitalLng != '', hospitalLat != ''){
        hospitalLnggte = hospitalLng * 2.00;
        hospitalLngLte = hospitalLng / 2.00;            
         //contact.find({ loc:{$longitude:{$gte: 9.10682735591432, $lte:23.10682735591432 }}}).then((data)=>{            
        contact.find({longitude:{$gte: 9.10682735591432}}).then((data)=>{                        
            res.status(200).send({datahos : data})
        }).catch(next);       
    }    
});

// delete - Data Hotels
router.delete('/delete', (req, res, next)=>{    
    hotelDelete = req.query['id'];    
    contact.findByIdAndDelete({_id: hotelDelete}).then((bodyData)=>{
        res.status(200).send({data: bodyData, delete:true});
    }).catch(next);
});

// update Data Hotels
router.put('/put', (req, res, next)=>{
    valuePutId       = req.query['id'];    
    Updataname       = req.query['name'];
    Updatadetails    = req.query['details'];
    Updatalongitude  = req.query['longitude'];
    Updatalatitude   = req.query['latitude'];
    Updatatype       = req.query['type'];
    Updatacategories = req.query['categories'];
    Updataactivation = req.query['activation'];    
    Updataphone      = req.query['phone'];
    Updatacity       = req.query['city'];
    Updatacountry    = req.query['country'];
            
    contact.findByIdAndUpdate({_id: valuePutId},{        
        name: Updataname,
        details: Updatadetails,
        longitude: Updatalongitude,
        latitude: Updatalatitude,
        type: Updatatype,
        categories: Updatacategories,
        city: Updatacity,
        phone: Updataphone,
        activation: Updataactivation,
        country: Updatacountry}).then(()=>{
        contact.find({_id: valuePutId}).then((dataput) =>{
            res.status(200).send(dataput);
        })
    }).catch(next);
})

module.exports = router;