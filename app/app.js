const express = require('express');
const routes = require('./routes/myRoutes');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const notFoundController = require('./controllers/notFoundController');

const app = express();

app.use(fileUpload());

app.use(cors());
app.use(express.json());

app.use('/', routes);
app.get('*', notFoundController)
// Afegit aquest endpoint/controlador a suggerència de l'Oriol per donar resposta a qualssevol altra request que no estigui definida a les rutes.

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
