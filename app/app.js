const express = require('express');
const routes = require('./routes/myRoutes');
const path = require('path');

const app = express();

app.use(express.json());

app.use(express.static('/uploads/images'));

/*Treat the CORS ERROR*/
app.use((req, res, next) => {
  //add certain headers to the response, before we forward the request to the different routes bellow.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Content-Type', 'application/octet-stream');
  next();
});
/*END of CORS ERROR treating*/

app.use('/', routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
