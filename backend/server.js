const express = require('express');
const app = express();
const cors = require('cors');
//require('events').EventEmitter.defaultMaxListeners = 15;

require('dotenv').config({path:"./config.env"});
const port = process.env.PORT||5000;

app.use(cors());
app.use(express.json())

// const port = 5000


const con = require('./db/connection')

app.use(require('./routes/routes'))

con.then(db => {
    if(!db) return process.exit(1);

    // listen to the http server 
    app.listen(port, () => {
        console.log(`Server is running on port: http://localhost:${port}`)
    })
    app.on('error', err => console.log(`Failed To Connect with HTTP Server : ${err}`));
    // error in mondb connection

}).catch(error => {
    console.log(`Connection Failed...! ${error}`);
});
// app.listen(port, () => {
//     console.log(`Server is running on port: http://localhost:${port}`)

// })
