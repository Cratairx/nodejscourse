// dns grejerna för min stationära testa på bärbara om det är samma fel alla behöver kanske inte göra detta
if (process.env.NODE_ENV !== 'production') {
    const dns = require('dns');
    dns.setServers(['8.8.8.8', '1.1.1.1']);
}
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require("./config/keys");
const bodyParser = require("body-parser");
require('./models/User');
require('./models/Survey');
require('./services/passport');
mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30* 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use((req, res, next) => {
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb) => cb();
    }
    if (req.session && !req.session.save) {
        req.session.save = (cb) => cb();
    }
    next();
});
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('{/*splat}', (req, res) => {

      res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);