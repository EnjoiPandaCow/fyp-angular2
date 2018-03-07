const User  = require('../models/user');
const jwt   = require('jsonwebtoken');
const config = require('../config/database');

// Passing in Express router and returning it to return all of the API routes.
module.exports = (router) => {

    // Register User Route
    router.post('/register', (req, res) => {
        if (!req.body.email) {
            res.json({success: false, message: 'You must provide and e-mail.'});
        } else {
            if (!req.body.username) {
                res.json({success: false, message: 'You must provide a username.'});
            } else {
                if (!req.body.password) {
                    res.json({success: false, message: 'You must provide a password.'});
                } else {
                    if (!req.body.fName) {
                        res.json({success: false, message: 'You must provide a first name.'});
                    } else {
                        if (!req.body.lName) {
                            res.json({success: false, message: 'You must provide a last name.'});
                        } else {
                            if (!req.body.role) {
                                res.json({success: false, message: 'You must provide a role.'});
                            } else {
                                if (!req.body.mobile) {
                                    res.json({success: false, message: 'You must provide a mobile phone number.'});
                                } else {
                                    // Creating new user.
                                    let user = new User({
                                        email: req.body.email.toLowerCase(),
                                        username: req.body.username,
                                        password: req.body.password,
                                        fName: req.body.fName,
                                        lName: req.body.lName,
                                        role: req.body.role,
                                        mobile: req.body.mobile
                                    });
                                    // Saving user and controlling errors.
                                    user.save((err) => {
                                        if (err) {
                                            if (err.code === 11000) {
                                                res.json({
                                                    success: false,
                                                    message: 'Username or e-mail already exists.'
                                                });
                                            } else {
                                                // If validation is wrong on the register fields.
                                                if (err.errors) {
                                                    if (err.errors.email) {
                                                        res.json({success: false, message: err.errors.email.message});
                                                    } else {
                                                        if (err.errors.username) {
                                                            res.json({success: false, message: err.errors.username.message});
                                                        } else {
                                                            if (err.errors.password) {
                                                                res.json({success: false, message: err.errors.password.message});
                                                            } else {
                                                                if (err.errors.fName) {
                                                                    res.json({success: false, message: err.errors.fName.message});
                                                                } else {
                                                                    if (err.errors.lName) {
                                                                        res.json({success: false, message: err.errors.lName.message});
                                                                    } else {
                                                                        if (err.errors.mobile) {
                                                                            res.json({success: false, message: err.errors.mobile.message});
                                                                        } else {
                                                                            res.json({success: false, message: err});
                                                                        }
                                                                    }
                                                                }

                                                            }
                                                        }
                                                    }
                                                } else {
                                                    res.json({
                                                        success: false,
                                                        message: 'Could not save user. Error:',
                                                        err
                                                    });
                                                }
                                            }
                                        } else {
                                            res.json({success: true, message: 'Account Registered!'})
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    // Checking if user email is already taken.
    router.get('/checkEmail:email', (req, res) => {
        // If email not provided
        if(!req.params.email) {
            res.json({ success: false, message: 'E-mail was not provided'});
            // If email provided.
        } else {
            // Return error if there was an error.
            User.findOne({ email: req.params.email}, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err});
                } else {
                    // Return if the email is already used.
                    if (user) {
                        res.json({ success: false, message: 'E-mail is already taken' });
                        // Return if email is okay.
                    } else {
                        res.json({ success: true, message: 'E-mail is available' });
                    }
                }
            });
        }
    });

    // Get all users.
    router.get('/allUsers', (req, res) => {
        User.find({}, (err, users) => {
          if (err) {
              res.json({ success: false, message: err});
          }  else {
              if (!users) {
                  res.json({ success: false, message: 'No users found'});
              } else {
                  res.json({ success: true, users: users});
              }
          }
        }).sort({ 'username': -1});
    });

    // Get Single User
    router.get('/singleUser/:id', (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: 'No User ID was provided.'});
        } else {
            User.findOne({ _id: req.params.id}, (err, user) => {
               if (err) {
                   res.json({ success: false, message: 'Not a valid user ID.'});
               } else {
                   if (!user) {
                       res.json({ success: false, message: 'User not found.'});
                   } else {
                       res.json({ success: true, user: user})
                   }
               }
            });
        }
    });

    // Update User
    router.put('/editUser', (req, res) => {
        if (!req.body._id) {
            res.json({ success: false, message: 'User ID not provided.'});
        } else {
            User.findOne({ _id: req.body._id }, (err, user) => {
                if (err) {
                    res.json({success: false, message: 'Not a valid user ID.'});
                } else {
                    if (!user) {
                        res.json({success: false, message: 'User ID was not found.'});
                    } else {
                        user.username = req.body.username;
                        user.role = req.body.role;
                        user.email = req.body.email;
                        user.mobile = req.body.mobile;
                        user.admin = req.body.admin;
                        user.save(err => {
                            if (err) {
                                res.json({success: false, message: err});
                            } else {
                                res.json({success: true, message: 'User Updated'});
                            }
                        });
                    }
                }
            });
        }
    });

    // Delete User
    router.delete('/deleteUser/:id', (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: 'No User ID provided.'});
        } else {
            User.findOne({ _id: req.params.id}, (err, user) => {
                if (err) {
                    res.json({ success: false, message: 'Not a valid user ID.'});
                } else {
                    if (!user) {
                        res.json({success: false, message: 'User not found.'});
                    } else {
                        user.remove((err) => {
                            if (err) {
                                res.json({success: false, message: err});
                            } else {
                                res.json({success: true, message: 'User Deleted.'});
                            }
                        })
                    }
                }

            });
        }
    });

    // Checking if username is already taken.
    router.get('/checkUsername:username', (req, res) => {
        if(!req.params.username) {
            res.json({ success: false, message: 'Username was not provided'});
        } else {
            User.findOne({ username: req.params.username}, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err});
                } else {
                    if (user) {
                        res.json({ success: false, message: 'Username is already taken' });
                    } else {
                        res.json({ success: true, message: 'Username is available' });
                    }
                }
            });
        }
    });

    // Login User Route
    router.post('/login', (req, res) => {
       if (!req.body.username) {
           res.json({ success: false, message: 'No username was provided.'});
       } else {
           if (!req.body.password) {
               res.json({ success: false, message: 'No password was provided.'})
           } else {
               User.findOne({ username: req.body.username}, (err, user) => {
                  if (err) {
                      res.json({ success: false, message: err});
                  } else {
                      if (!user) {
                          res.json({ success: false, message: 'Username not found.'});
                      } else {
                          const validPassword = user.comparePassword(req.body.password);
                          if (!validPassword) {
                              res.json({ success: false, message: 'Password invalid'});
                          } else {
                              const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h'});
                              res.json({ success: true, message: 'Great Success !!', token: token, user: { username: user.username, admin: user.admin, fName: user.fName} });
                          }
                      }
                  }
               });
           }
       }
    });

    // Middleware that grabs the token from the header
    router.use((req, res, next) => {
        const token = req.headers['authorization'];
        //const admin = req.headers['admin'];
        if (!token) {
            res.json({success: false, message: 'No token provided'});
        } else {
            jwt.verify(token, config.secret, (err, decoded) => {
               if (err) {
                   res.json({ success: false, message: 'Token invalid: ' + err});
               } else {
                   req.decoded = decoded;
                   next();
               }
            });
        }
    });

    router.get('/profile', (req, res) => {
       User.findOne({ _id: req.decoded.userId }).select('username email fName lName role mobile').exec((err, user) => {
          if (err) {
              res.json({ success: false, message: err});
          } else {
              if (!user) {
                  res.json({ success: false, message: 'User not found.'})
              } else {
                  res.json({ success : true, user: user});
              }
          }
       });
    });

    return router;
};