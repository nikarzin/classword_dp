const { connection } = require('../database/connection');

class UserService {

    static getByID = async (id) => {
        return await (new Promise((resolve, reject) => {
            connection.query('select id, name, email, dob, created_at, updated_at from `users` where id=?', [id], function (error, results, fields) {
                if (error) return reject(error);
                console.table(results);
                resolve(results)
            });
        }));
    }

    static getByEmail = async (email) => {
        return await (new Promise((resolve, reject) => {
            connection.query('select * from `users` where email=?', [email], function (error, results, fields) {
                if (error) return reject(error);
                console.table(results);
                resolve(results[0])
            });
        }));
    }
}

module.exports = {
    UserService
}