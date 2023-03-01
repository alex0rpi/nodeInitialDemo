const express = require('express');
const routes = require('./routes/myRoutes');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}))

app.use('/', routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
