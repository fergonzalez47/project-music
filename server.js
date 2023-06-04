const express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require('./db/connection.js');
const exphbs = require("express-handlebars").create({ defaultLayout: 'main', extname: '.hbs' });

const path = require('path');


//middleware que se utiliza para analizar los cuerpos de las solicitudes entrantes en JSON / datos URL - encoded
const bodyParser = require('body-parser');
const errorHandler = require('./errorHandler');



// // swaggerAutogen
// const swaggerAutogen = require('swagger-autogen')();

// Handlebars

app.engine('.hbs', exphbs.engine);
app.set("view engine", ".hbs");

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


app.use("/", require('./routes'));

//Error Handler
app.use(errorHandler);

app.listen(port);
console.log("Web server is listening at port ", port);