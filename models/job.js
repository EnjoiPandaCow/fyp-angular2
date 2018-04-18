const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
const Schema     = mongoose.Schema;

let validDate = (date) => {
    if (!date) {
        return false;
    }  else {
        const datePattern = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
        return datePattern.test(date);
    }
};

const dateValidators = [
    {
        validator: validDate,
        message: 'Please enter a valid date.'
    }
];

const jobSchema = new Schema({

    title: {type: String, required: true},
    description: {type: String, required: true},
    size: {type: String, required: true},
    pDate: {type: Date, required: true, dateValidators},
    pTime: {type: String, required: true},
    pAddress: {type: String, required: true},
    dDate: {type: Date, required: true, dateValidators},
    dTime: {type: String, required: true},
    dAddress: {type: String, required: true},
    postedOn: {type: Date, default: Date.now()},
    postedBy: {type: String},
    comments: [{
        comment: { type: String },
        commentator: {type: String}
    }]

});

module.exports = mongoose.model('Job', jobSchema);