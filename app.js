const express = require('express');
const app = express();
const { connection } = require('./database/connection');
const user = require('./user/route');
const member = require('./member/route');
require('dotenv').config();
const {
    HOST,
    PORT,
} = process.env;

app.use(express.json());

app.use('/user', user.route)
app.use('/member', member.route)
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log("Mysql connected succesfully");
});

app.listen(PORT, () => {
    console.log(`started: ${HOST}:${PORT}`)
})