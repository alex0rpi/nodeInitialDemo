const express = require('express');
const routes = require('./routes/myRoutes');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
