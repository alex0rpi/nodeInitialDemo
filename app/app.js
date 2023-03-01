const express = require('express');
const fileUpload = require('express-fileupload');
const routes = require('./routes/myRoutes');
const path = require('path');

const app = express();

// Enable json parsing
app.use(express.json());

/*Treat the CORS ERROR*/
app.use((req, res, next) => {
  //add certain headers to the response, before we forward the request to the different routes bellow.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'application/octet-stream');
  next();
});
/*END of CORS ERROR treating*/

app.use('/', routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));

console.log('bon dia')
