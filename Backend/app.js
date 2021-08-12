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

// import typeCertificate and use
const typeCertificate_Route = require('./src/routes/typeCertificRoute');
app.use(typeCertificate_Route);

// import typeActivity and use
const typeActivity_Route = require('./src/routes/typeActivRoute');
app.use(typeActivity_Route);

// import member route and use
const member_Route = require('./src/routes/memberRoute');
app.use(member_Route);

// import move route and use
const move_Route = require('./src/routes/moveRoute');
app.use(move_Route);


// import retirememt and use
const retirememt_Route = require('./src/routes/retirementRoute');
app.use(retirememt_Route);

// import certificate and use
const certificate_Route = require('./src/routes/certificRoute');
app.use(certificate_Route);

const activity_Route = require('./src/routes/activRoute');
app.use(activity_Route);

const receive_Route = require('./src/routes/recive_moneyRoute');
app.use(receive_Route)

const authenticate_Route = require('./src/routes/authRoute');
app.use(authenticate_Route)

const reportMove = require('./src/routes/reportMoveRoute')
app.use(reportMove);


const reportRetirememt = require('./src/routes/reportRetireRoute')
app.use(reportRetirememt);

const reportReceive = require('./src/routes/reportReceiveRoute')
app.use(reportReceive);

const reportActiv = require('./src/routes/reportActivRoute')
app.use(reportActiv);

const reportCertificate = require('./src/routes/reportCertificRoute')
app.use(reportCertificate);

const reportStatistic = require('./src/routes/reportStatisRoute')
app.use(reportStatistic);
// server listen to the port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});