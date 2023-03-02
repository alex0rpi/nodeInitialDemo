const express = require('express');
const routes = require('./routes/myRoutes');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

app.use(cors());
app.use(express.json());

app.use('/', routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
