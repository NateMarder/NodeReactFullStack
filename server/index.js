const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// get the port dynamically if deploying in production env
const PORT = process.env.PORT || 5000;

app.listen(PORT);
