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
        // longitude:Insertlongitude,
        // latitude:Insertlatitude,         
        loc:{coordinates: [ Insertlongitude, Insertlatitude]},      
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
    name  = req.query["name"];                 
    limit = req.query["limit"];
    city  = req.query["city"];
    long  = req.query["lng"];
    lat   = req.query["lat"];
    phone = req.query["lat"];
    cat   = req.query['cat']; // categories  
    dis   = req.query['dis'];
    admin  = req.query['admin'];
    active  = req.query['active'];
    /**
     ***** All Api Link To Use **** 
     *************Admin************
     * 1- search all Data :
     *  - http://localhost:3000/api/hotel?name=all&city=all&cat=all&admin=admin&limit=10&active=all
     * 
     * 2- search by Name :  
     *  - http://localhost:3000/api/hotel?name=nameCity&city=all&cat=all&admin=admin&limit=10&active=all
     * 
     * 
     ******** End Admin ***********
     *
     * 
     * 
     **/
    // Show All hospital == {{**Admin**}}
    if(name == 'all' && city == 'all' && cat == 'all' && admin =='admin' && active == 'all'){
        contact.find({}).then((AllDatahotels) => {            
            res.status(200).send({
                hotels     : AllDatahotels.slice(0,limit),
                adminCount : AllDatahotels.length
            });
        }).catch(next);        
    }// search by name Hospital == {{**Admin**}}
    else if (name != 'all' && city == 'all' && cat == 'all' && admin =='admin' && active == 'all'){        
        contact.find({name: new RegExp('^' + name + '$', "i")}).then((dataHotels) => {
            res.status(200).send({
                dataHotels : dataHotels.slice(0,limit),
                countByName  : dataHotels.length
            });                
        }).catch(next);    
    }// Show All hospital By City == {{**Admin**}}
    else if(name == 'all' && city != 'all' && cat == 'all' && admin =='admin' && active == 'all'){        
        contact.find({city: new RegExp('^' + city + '$', "i")}).then((data) => {
            res.status(200).send({
                datahospital : data.slice(0,limit),
                countByCity    : data.length
            });                
        }).catch(next);
    } //search by name and city == {{**Admin**}}    
    else if(city != 'all' && name != 'all' && cat == 'all' && admin =='admin' && active == 'all'){        
        contact.find({
            name: new RegExp('^' + name + '$', "i"),
            city: new RegExp('^' + city + '$', "i")
        }).then((data) => {
            res.status(200).send({
                datahospital     : data.slice(0,limit),
                countCityAndName : data.length
            });                
        }).catch(next);
    }// search from activation only == {{**admin**}}
    else if(city == 'all' && name == 'all' && active != 'all' && admin == 'admin'&& cat=='all'){
        console.log('dsd')
        contact.find({                         
            activation: active
        }).then((data) => {
            res.status(200).send({
                datahospital : data.slice(0,limit),
                countActive  : data.length
            });                
        }).catch(next);
    }// search from categories only == {{**admin**}}
    else if(city == 'all' && name == 'all' && cat != 'all' && admin == 'admin'){               
        contact.find({                         
            categories: new RegExp('^' + cat + '$', "i")
        }).then((data) => {
            res.status(200).send({
                datahospital : data.slice(0,limit),
                countCat  : data.length
            });                
        }).catch(next);
    }// search from city & categories == {{**admin and user **}}
    else if(city != 'all' && name == 'all' && cat != 'all' && admin == 'admin'){               
        contact.find({             
            city: new RegExp('^' + city + '$', "i"),         
            categories: new RegExp('^' + cat + '$', "i")
        }).then((data) => {
            res.status(200).send({
                datahospital : data.slice(0,limit),
                countcityCat  : data.length
            });                
        }).catch(next);
    }
    // search from city, active, long and lat== {{**user**}}
    else if(city != 'all' && name == 'all' && cat == 'all' && long != ''& lat != '' && active != 'all'){               
        contact.find({                      
            loc:
            { $near :
               {
                 $geometry: { type: "Point",  coordinates: [ long, lat ] },                
                 $maxDistance:dis
               }
            }
        }).then((data) => {
            res.status(200).send({
                datahospital : data.slice(0,limit),
                countNearLoc   : data.length
            });                
        }).catch(next);
    } 
     // show by longitude and latitude        
    // else if(long != '', lat != ''& city =='all'& name=='all'&cat == 'all'){
    //     contact.find(
    //         {
    //           loc:
    //             { $near :
    //                {
    //                  $geometry: { type: "Point",  coordinates: [ long, lat ] },                    
    //                  $maxDistance: 2000
    //                }
    //             }
    //         }
    //      ).then((data)=>{                        
    //             res.status(200).send({datahos : data, countlon: data.length})
    //     }).catch(next);       
    // }    
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
        // longitude: Updatalongitude,
        // latitude: Updatalatitude,                
        loc:{coordinates: [ Updatalongitude, Updatalatitude]},
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