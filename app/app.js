const express = require('express');

const app = express();

app.get('/user', (req, res) => {
  res.json({
    nom: 'Alex',
    edat: 49,
    url: req.url,
  });
});
app.post('/upload', (req, res) => {
  res.json({
    nom: 'Alex',
    edat: 49,
    url: req.url,
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));