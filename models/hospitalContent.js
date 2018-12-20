const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
    name: {
        type: String,
        required: [true, 'hospital names is required']
    },
    details: {
        type: String,
        required: [true, 'hospital names is required']
    },    
    loc: {
        type: {
            type: "String",
            required: true,
            enum: ['Point', 'LineString', 'Polygon'],
            default: 'Point',
            index: '2d'
        },
        coordinates: [Number]
    },
    type: String,
    categories: {
        type: String,
        required: [true, 'categories names is required']
    },
    activation:{
        type: Boolean,
        required: [true, 'activation names is required']
    },
    phone:{
        type: Number,
        required: [true, 'number names is required']
    },
    review:[{
        nameUser: String,
        rate: Number,
        comment: String,
        timeComment: Date
    }],
    city: {
        type: String,
        required: [true, 'city names is required']
    },
    country: {
        type: String,
        required: [true, 'country names is required']
    },
    address: {
        type: String     
    }
});
hospitalSchema.index({'gpshits' : '2dsphere'});
const Datahospital = mongoose.model('hospitaldetails', hospitalSchema); //hospitaldetails

module.exports = Datahospital;