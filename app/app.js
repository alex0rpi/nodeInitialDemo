const express = require('express');
const routes = require('./routes/myRoutes');

const app = express();

// Enable json parsing
app.use(express.json());

app.use('/', routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
