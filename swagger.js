const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My Music API',
        description: 'API for getting, posting, updating and deleting Artists and Albums belonging to them.',
    },
    host: 'cse341-project-music.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

//npm run swagger - autogen