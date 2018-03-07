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

let commentLengthChecker = (comment) => {
    if (!comment[0]) {
        return false;
    }  else {
        if (comment[0].length < 1 || comment[0].length > 200) {
            return false;
        } else {
            return true;
        }
    }
};

const dateValidators = [
    {
        validator: validDate,
        message: 'Please enter a valid date.'
    }
];

const commentValidators = [
    {
        validator: commentLengthChecker,
        message: 'Please enter a comment between 1 - 200 characters.'
    }
];

const reservationSchema = new Schema({

    facility: {type: String, required: true},
    date: {type: Date, required: true, dateValidators},
    sTime: {type: String, required: true},
    eTime: {type: String, required: true},
    postedBy: {type: String},
    postedOn: {type: Date, default: Date.now() },
    approved: {type: Boolean, default: false},
    approvedBy: { type: Array },
    disapprovedBy: { type: Array },
    comments: [
        {
            comment: {type: String, validate: commentValidators},
            commenter: {type: String}
        }
    ]
});


module.exports = mongoose.model('Reservation',  reservationSchema);