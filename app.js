const express = require('express');
const app = express();
const { connection } = require('./database/connection');
const user = require('./user/route');
const {
    HOST,
    PORT,
} = process.env;

app.use(express.json());

app.use('/user', user.route);

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT * FROM `users`', function (error, results, fields) {
        if (error) throw error;

        console.table(results)
    })
});

app.listen(PORT, () => {
    console.log(`started: ${HOST}:${PORT}`)
})