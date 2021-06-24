// import express
const express = require('express');

// import cors
const cors = require('cors');

// import morgan
const logger = require('morgan');

// import body-pasrser
const bodyParser = require('body-parser');

// init express
const app = express();

// use morgan
app.use(logger('dev'));

// use express json
app.use(express.json());

//parse request data content type application/x-wwww-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

//parse request data content type application/json
app.use(bodyParser.json());

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

// use cors
app.use(cors());

// setup the server port
const PORT = process.env.PORT || 5000

//example route
app.get('/', (req, res, next) => {
    res.send('Hello World');
    console.log('Hello World');
});

// import foundation route and use 
const foundation_Route = require('./src/routes/foundationRoute');
app.use(foundation_Route);

// import unit route and use 
const unit_Route = require('./src/routes/unitRoute');
app.use(unit_Route);

// import section route and use 
const section_Route = require('./src/routes/sectionRoute');
app.use(section_Route);

// import educationlevel route and use
const educationlevel_Route = require('./src/routes/educationlevelRoute')
app.use(educationlevel_Route);

// import typemember route and use
const typemember_Route = require('./src/routes/typememberRoute');
app.use(typemember_Route);

// import member route and use
const member_Route = require('./src/routes/memberRoute');
app.use(member_Route);

// import move route and use
const move_Route = require('./src/routes/moveRoute');
app.use(move_Route);

// import retirememt and use
const retirememt_Route = require('./src/routes/retirementRoute');
app.use(retirememt_Route);

// server listen to the port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});