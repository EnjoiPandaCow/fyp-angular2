const express        = require('express'); // Bringing in Express package.
const router         = express.Router();
const app            = express(); // Initializing our Express application and saving it in the const app.
const mongoose       = require('mongoose');
const config         = require('./config/database'); // Importing database config
const path           = require('path');
const authentication = require('./routes/authentication')(router);
const reservation    = require('./routes/reservation')(router);
const bodyParser     = require('body-parser');
const cors           = require('cors'); // Allows for cross origin

// Database connection
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Could not connect to database: ', err);
    } else {
        console.log('Connected to database: ' + config.db);
    }
});


// Middleware
app.use(cors( {
    origin: 'http://localhost:4200' // Allowing requests to be made from that URL.
}));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/')); // Providing access to the dist directory.
app.use('/authentication', authentication);
app.use('/reservations', reservation);

/* Anytime user sends a request we are going to respond with something.
   In this case the home page.
   By using the '*' no matter what route our users go to the will get that message.
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

// Telling the server to listen on the port 8080.
app.listen(8080, () => {
    console.log('Listening on port 8080');
});

