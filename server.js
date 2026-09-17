const express = require('express'); //libreria
const bodyParser = require('body-parser');
const mongodb = require('./data/database');

const port = process.env.PORT || 3000;
const app = express(); //funcion

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `CaughtException: ${err}/n` + `Exception origin: ${origin}`);
});


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => (console.log(`Database is listening and node running on port ${port}`)));
    }
});
