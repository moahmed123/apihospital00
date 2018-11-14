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
    longitude: {
        type: Number,
        required: [true, 'longitude names is required']
    },
    latitude: {
        type: Number,
        required: [true, 'latitude names is required']
    },
    type: String,
    categories: {
        type: String,
        required: [true, 'categories names is required']
    },
    activation: Boolean,
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
    }
});

const Datahospital = mongoose.model('hospitaldetails', hospitalSchema);

module.exports = Datahospital;