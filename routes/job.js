const User  = require('../models/user');
const Job = require('../models/job');
const jwt   = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {

    router.post('/newJob', (req, res) => {
        if (!req.body.title) {
            res.json({success: false, message: 'Title of your job is required.'});
        } else {
            if (!req.body.size) {
                res.json({success: false, message: 'The size of the item is required.'});
            } else {
                if (!req.body.pAddress) {
                    res.json({success: false, message: 'Pickup address is required.'});
                } else {
                    if (!req.body.pDate) {
                        res.json({success: false, message: 'Pickup date is required.'});
                    } else {
                        if (!req.body.pTime) {
                            res.json({success: false, message: 'Pickup time is required.'});
                        } else {
                            if (!req.body.dAddress) {
                                res.json({success: false, message: 'Drop off address is required.'});
                            } else {
                                if (!req.body.dDate) {
                                    res.json({success: false, message: 'Drop off date is required.'});
                                } else {
                                    if (!req.body.dTime) {
                                        res.json({success: false, message: 'Drop off time is required.'});
                                    } else {
                                        const job = new Job({
                                            title: req.body.title,
                                            size: req.body.size,
                                            pAddress: req.body.pAddress,
                                            pDate: req.body.pDate,
                                            pTime: req.body.pTime,
                                            dAddress: req.body.dAddress,
                                            dDate: req.body.dDate,
                                            dTime: req.body.dTime
                                        });
                                        job.save((err) => {
                                            if (err) {
                                                if (err.errors) {
                                                    if (err.errors.date) {
                                                        res.json({success: false, message: err.errors.date.message});
                                                    } else {
                                                        res.json({success: false, message: err.errmsg});
                                                    }
                                                } else {
                                                    res.json({success: false, message: err});
                                                }
                                            } else {
                                                res.json({success: true, message: 'Job Created!'})
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    return router;
};







