const express = require('express'); //libreria
const app = express(); //funcion

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

app.listen(port, () => (console.log(`Running on port ${port}`)));