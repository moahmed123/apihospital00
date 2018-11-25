const express = require('express');
const router = express.Router();
const contact = require('../models/hotelContent');

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
    //Insertreview     = req.query['review'];
    Insertcity       = req.query['city'];
    Insertcountry    = req.query['country'];
    //valuePutId = req.query['id'];
    contact.create(
        {name: Insertname,
        details: Insertdetails,
        longitude: Insertlongitude,
        latitude: Insertlatitude,
        type: Inserttype,
        categories: Insertcategories,
        city: Insertcity,
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
    hotelName = req.query["name"];    
    // To Find All Data Hotels.
    if(hotelName == 'all'){
        contact.find({}).then((AllDatahotels) => {
            res.status(200).send({hotels: AllDatahotels});
        }).catch(next);
    }else{
        // Search For Hotels By Name.
        contact.find({name: new RegExp('^' + hotelName + '$', "i")}).then((dataHotels) => {
            res.status(200).send({dataHotels : dataHotels});                
        }).catch(next);
    }
    
});

// delete - Data Hotels
router.delete('/delete', (req, res, next)=>{    
    hotelDelete = req.query['id'];    
    contact.findByIdAndDelete({id: hotelDelete}).then((bodyData)=>{
        res.status(200).send({data: bodyData, delete:true});
    }).catch(next);
});

// update Data Hotels

router.put('/put', (req, res, next)=>{
    valuePutId = req.query['id'];
    namedata = req.query['name'];
    contact.findOneAndUpdate({_id: valuePutId},{name: namedata}).then(()=>{
        contact.find({_id: valuePutId}).then((dataput) =>{
            res.status(200).send(dataput);
        })
    }).catch(next);
})

module.exports = router;