const User  = require('../models/user');
const Reservation = require('../models/reservation');
const jwt   = require('jsonwebtoken');
const config = require('../config/database');

// Passing in Express router and returning it to return all of the API routes.
module.exports = (router) => {

    router.post('/newReservation', (req, res) => {
       if (!req.body.facility) {
           res.json({ success: false, message: 'Facility used by your reservation is required.'})
       } else {
           if (!req.body.date) {
               res.json ({ success: false, message: 'Date of your reservation is required.'})
           } else {
               if (!req.body.sTime) {
                   res.json ({ success: false, message: 'Start time of your reservation is required.'})
               } else {
                   if (!req.body.eTime) {
                       res.json ({ success: false, message: 'End time of your reservation is required.'})
                   } else {
                       if (!req.body.postedBy) {
                           res.json ({ success: false, message: 'Creator of your reservation is required.'});
                       } else {
                           const reservation = new Reservation({
                             facility: req.body.facility,
                             date: req.body.date,
                             sTime: req.body.sTime,
                             eTime: req.body.eTime,
                             postedBy: req.body.postedBy
                           });
                           reservation.save((err) => {
                              if (err) {
                                  if (err.errors) {
                                      if (err.errors.date) {
                                          res.json({ success: false, message: err.errors.date.message});
                                      } else {
                                          res.json({ success: false, message: err.errmsg });
                                      }
                                  } else {
                                      res.json({ success: false, message: err});
                                  }
                              } else {
                                  res.json({ success: true, message: 'Registration Created!'})
                              }
                           });
                       }
                   }
               }
           }
       }
    });

    router.get('/allReservations', (req, res) => {
       Reservation.find({}, (err, reservations) => {
           if (err) {
               res.json({ success: false, message: err});
           } else {
               if (!reservations) {
                   res.json({ success: false, message: 'No reservations found.'});
               } else {
                   res.json({ success: true, reservations: reservations});
               }
           }
       }).sort({ '_id': -1 });
    });

    router.get('/singleReservation/:id', (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: 'No reservation ID was provided.'});
        } else {
            Reservation.findOne({_id: req.params.id}, (err, reservation) => {
                if (err) {
                    res.json({ success: false, message: "Not a valid reservation ID." });
                } else {
                    if (!reservation) {
                        res.json({ success: false, message: 'Reservation not found.'});
                    } else {
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                           if (err) {
                               res.json({ success: false, message: err});
                           } else {
                               if (!user) {
                                   res.json({ success: false, message: 'Unable to authenticate user.'});
                               } else {
                                   if (user.username !== reservation.postedBy && user.admin !== true) {
                                       res.json({ success: false, message: 'You are not authorized to edit this reservation.'});
                                   } else {
                                       res.json({ success: true, reservation: reservation});
                                   }
                               }
                           }
                        });
                    }
                }
            });
        }
    });

    router.put('/updateReservation', (req, res) => {
        // Checking if the reservation ID is in the request body.
        if (!req.body._id) {
            res.json({ success: false, message: 'Reservation ID not provided.'});
        } else {
            Reservation.findOne({ _id: req.body._id }, (err, reservation) => {
                if (err) {
                    res.json({ success: false, message: 'Not a valid reservation ID.'});
                } else {
                    if (!reservation) {
                        res.json({ success: false, message: 'Reservation ID was not found.'});
                    } else {
                        // Checking that the person trying to update is the person that made the reservation.
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                           if (err) {
                               res.json({ success: false, message: err});
                           } else {
                               if (!user) {
                                   res.json({ success: false, message: 'Unable to authenticate user.'});
                               } else {
                                   if (user.username !== reservation.postedBy && user.admin !== true) {
                                       res.json({ success: false, message: 'You are not authorized to edit this reservation.'});
                                   } else {
                                       reservation.facility = req.body.facility;
                                       reservation.date = req.body.date;
                                       reservation.sTime = req.body.sTime;
                                       reservation.fTime = req.body.fTime;
                                       reservation.approved = req.body.approved;
                                       reservation.save(err => {
                                           if (err) {
                                               res.json({ success: false, message: err });
                                           } else {
                                               res.json({ success: true, message: 'Reservation Updated'});
                                           }
                                       });
                                   }
                               }
                           }
                        });
                    }
                }
            });
        }
    });

    router.delete('/deleteReservation/:id', (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: 'No reservation ID provided.'});
        } else {
            Reservation.findOne({ _id: req.params.id}, (err, reservation) => {
                if (err) {
                    res.json({ success: false, message: 'Not a valid reservation ID.'});
                } else {
                    if (!reservation) {
                        res.json({success: false, message: 'Reservation not found.'});
                    } else {
                        User.findOne({_id: req.decoded.userId}, (err, user) => {
                            if (err) {
                                res.json({success: false, message: err});
                            } else {
                                if (!user) {
                                    res.json({success: false, message: 'Unable to authenticate user.'});
                                } else {
                                    if (user.username !== reservation.postedBy && user.admin !== true) {
                                        res.json({success: false, message: 'You are not authorized to delete this reservation.'});
                                    } else {
                                        reservation.remove((err) => {
                                            if (err) {
                                                res.json({success: false, message: err});
                                            } else {
                                                res.json({success: true, message: 'Reservation Deleted.'});
                                                console.log(user.admin);
                                            }
                                        })
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });
    return router;
};