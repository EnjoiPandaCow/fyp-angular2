const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
const Schema     = mongoose.Schema;
const bcrypt     = require('bcrypt-nodejs'); // Importing BCrypt for password encryption.

// Validating the length of the users email.
let emailLengthChecker = (email) => {
  if (!email) {
      return false;
  } else {
      if (email.length < 5 || email.length > 50) {
          return false;
      } else {
          return true;
      }
  }
};
// Returns pattern of the users email. Returns true or false.
let validEmailChecker = (email) => {
  if (!email) {
      return false;
  } else {
      const emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return emailPattern.test(email);
  }
};

let usernameLengthChecker = (username) => {
    if (!username) {
        return false;
    } else {
        if (username.length < 3 || username.length > 20) {
            return false;
        } else {
            return true;
        }
    }
};
let validUsername = (username) => {
  if (!username) {
      return false;
  }  else {
      const usernamePattern = new RegExp(/^[a-zA-Z0-9]+$/);
      return usernamePattern.test(username);
  }
};

let fNameLengthChecker = (fName) => {
  if (!fName) {
      return false;
  } else {
      if (fName.length < 1 || fName.length > 20) {
          return false;
      } else {
          return true;
      }
  }
};
let valid_fName = (fName) => {
    if (!fName) {
        return false;
    } else {
        const fNamePattern = new RegExp(/^[a-z ,.'-]+$/i);
        return fNamePattern.test(fName);
    }
};

let lNameLengthChecker = (lName) => {
    if (!lName) {
        return false;
    } else {
        if (lName.length < 3 || lName.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};
let valid_lName = (lName) => {
    if (!lName) {
        return false;
    } else {
        const lNamePattern = new RegExp(/^[a-z ,.'-]+$/i);
        return lNamePattern.test(lName);
    }
};

let mobileLengthChecker = (mobile) => {
    if (!mobile) {
        return false;
    } else {
        if (mobile.length < 10 || mobile.length > 15) {
            return false;
        } else {
            return true;
        }
    }
};
let validMobile = (mobile) => {
    if (!mobile) {
        return false;
    } else {
        const mobilePattern = new RegExp(/([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/);
        return mobilePattern.test(mobile);
    }
};

let passwordLengthChecker = (password) => {
  if (!password) {
      return false;
  }  else {
      if (password.length < 8 || password.length > 35) {
          return false;
      } else {
          return true;
      }
  }
};
let validPassword = (password) => {
    if (!password) {
        return false;
    } else {
        const passwordPattern = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return passwordPattern.test(password);
    }
};

const emailValidators = [
    {
        validator: emailLengthChecker,
        message: 'E-mail must be at least 5 characters but no more than 50.'
    },
    {
        validator: validEmailChecker,
        message: 'Please enter a valid e-mail.'
    }
];

const usernameValidators = [
    {
        validator: usernameLengthChecker,
        message: 'Username must be at least 3 characters but no more than 20.'
    },
    {
        validator: validUsername,
        message: 'Username must not have any special characters.'
    }
];

const fNameValidators = [
    {
        validator: fNameLengthChecker,
        message: 'First name must be at least 1 character but no more than 20.'
    },
    {
        validator: valid_fName,
        message: 'First name must not have any special characters.'
    }
];

const lNameValidators = [
    {
        validator: lNameLengthChecker,
        message: 'Last Name must be at least 3 character but no more than 30.'
    },
    {
        validator: valid_lName,
        message: 'Last Name must not have any special characters.'
    }
];

const mobileValidators = [
    {
        validator: mobileLengthChecker,
        message: 'Phone number must be at least 10 character but no more than 15.'
    },
    {
        validator: validMobile,
        message: 'Must be a valid mobile phone number.'
    }
];

const passwordValidators = [
    {
        validator: passwordLengthChecker,
        message: 'Password must be at least 8 characters but no more than 35.'
    },
    {
        validator: validPassword,
        message: 'Must have at least one uppercase, lowercase, special character, and number.'
    }
];

const userSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true, validate: emailValidators},
    username: {type: String, required: true, unique: true, lowercase: false, validate: usernameValidators},
    fName: {type: String, required: true, validate: fNameValidators},
    lName: {type: String, required: true, validate: lNameValidators},
    role: {type: String, required: true},
    mobile: {type: String, required: true, validate: mobileValidators},
    admin: {type: Boolean, require: true, default: false},
    password: {type: String, required: true, }
});

// Creating middleware for the schema, before the user is saved it will encrypt the password.
userSchema.pre('save', function(next) {
    // Checking if the password field has not been modified.
    if (!this.isModified('password'))
        return next();

    // Encrypting the users password.
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

// Creating a new method for the user schema to compare password when logging in.
userSchema.methods.comparePassword = function (password) {
  // Returns true or false as being a match.
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User',  userSchema);