const path = require('path');
const express = require('express');
const app = express();
const cors = require("cors");
const passport = require("passport");
const connectDB = require('./db/connection.js');
const exphbs = require("express-handlebars").create({ defaultLayout: 'main', extname: '.hbs' });

const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');


//Passport config

require('./passport.js')(passport);

//middleware que se utiliza para analizar los cuerpos de las solicitudes entrantes en JSON / datos URL - encoded
const bodyParser = require('body-parser');
const errorHandler = require('./errorHandler');


// // swaggerAutogen
const swaggerAutogen = require('swagger-autogen')();

// Handlebars

app.engine('.hbs', exphbs.engine);
app.set("view engine", ".hbs");

//Express-Session

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    //A mi me funcionó, por la version mas reciente hacerlo con el metodo Create,
    //y no como la creación de objeto. Además, aqui se tiene que pasar una propiedad,
    // la URL de DB. 
    store:MongoStore.create({
        mongoUrl: process.env.DB_URL ,
        mongooseConnection: mongoose.connection
    })
}));

//passport middleware

app.use(passport.initialize());
app.use(passport.session());

// Static folder

app.use(express.static(path.join(__dirname, 'public')));


// Analizar solicitudes con cuerpo JSON
app.use(bodyParser.json());
// Analizar solicitudes con datos URL-encoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Once called the function, is time to run it...
connectDB();

const port = process.env.port || 3000;


app.use("/", require('./routes/index.js'));
app.use("/auth", require('./routes/auth.js'));

//Error Handler
app.use(errorHandler);

app.listen(port);
console.log("Web server is listening at port ", port);