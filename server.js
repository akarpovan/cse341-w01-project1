const express = require('express'); //libreria
const mongodb = require('./data/database');

const app = express(); //funcion

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => (console.log(`Database is listening and node running on port ${port}`)));
    }
});
