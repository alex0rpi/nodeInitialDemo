const express = require('express');
const routes = require('./routes/myRoutes');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const notFoundController = require('./controllers/notFoundController');
require('dotenv').config();

const app = express();

app.use(fileUpload());

app.use(cors());
app.use(express.json());

app.use('/', routes);
app.get('*', notFoundController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
