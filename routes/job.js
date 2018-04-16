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
                                            dTime: req.body.dTime,
                                            postedBy: req.body.postedBy
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

    router.get('/allJobs', (req, res) => {
        Job.find({}, (err, jobs) => {
            if (err) {
                res.json({ success: false, message: err});
            } else {
                if (!jobs) {
                    res.json({ success: false, message: 'No jobs found.'});
                } else {
                    res.json({ success: true, jobs: jobs});
                }
            }
        }).sort({ '_id': -1 });
    });

    router.get('/singleJob/:id', (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: 'No job ID was provided.'});
        } else {
            Job.findOne({_id: req.params.id}, (err, job) => {
                if (err) {
                    res.json({ success: false, message: "Not a valid job ID." });
                } else {
                    if (!job) {
                        res.json({ success: false, message: 'Job not found.'});
                    } else {
                        res.json({ success: true, job: job});
                    }
                }
            });
        }
    });

    router.put('/updateJob', (req, res) => {
        // Checking if the job ID is in the request body.
        if (!req.body._id) {
            res.json({success: false, message: 'Job ID not provided.'});
        } else {
            Job.findOne({_id: req.body._id}, (err, job) => {
                if (err) {
                    res.json({success: false, message: 'Not a valid job ID.'});
                } else {
                    if (!job) {
                        res.json({success: false, message: 'Job ID was not found.'});
                    } else {
                        job.title = req.body.title;
                        job.size = req.body.size;
                        job.pDate = req.body.pDate;
                        job.pTime = req.body.pTime;
                        job.pAddress = req.body.pAddress;
                        job.dDate = req.body.dDate;
                        job.dTime = req.body.dTime;
                        job.dAddress = req.body.dAddress;
                        job.save(err => {
                            if (err) {
                                res.json({success: false, message: err});
                            } else {
                                res.json({success: true, message: 'Job Updated'});
                            }
                        });
                    }
                }
            });
        }
    });

    router.delete('/deleteJob/:id', (req, res) => {
        if (!req.params.id) {
            res.json({success: false, message: 'No job ID provided.'});
        } else {
            Job.findOne({_id: req.params.id}, (err, job) => {
                if (err) {
                    res.json({success: false, message: 'Not a valid job ID.'});
                } else {
                    if (!job) {
                        res.json({success: false, message: 'Job not found.'});
                    } else {
                        job.remove((err) => {
                            if (err) {
                                res.json({success: false, message: err});
                            } else {
                                res.json({success: true, message: 'Job Deleted.'});
                            }
                        })
                    }
                }
            });
        }
    });

    return router;
};







