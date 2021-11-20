const { connection } = require('../database/connection');

class UserService {

    static getByUsername = async (username) => {
        let userData = new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
                if (error) return reject(error);
                resolve(results)
            });
        });
        let result = await userData;
        return result[0];
    }

    //service get all users 
    static getAll = async () => {
        let userData = new Promise((resolve, reject) => {
            connection.query('select  id,name,dob,created_at,updated_at from `users`', function (error, results, fields) {
                if (error) return reject(error);
                resolve(results)
            });
        });
        let result = await userData;
        return result;
    }

    //service get by id 
    static getByid = async (id) => {
        let userData = new Promise((resolve, reject) => {
            connection.query('select id,name,dob,created_at,updated_at from `users` where id=?', [id], function (error, results, fields) {
                if (error) return reject(error);
                resolve(results)
            });
        });
        let result = await userData;
        return result;
    }

    //service insert user 
    static insert = (name, gender, dob, username, password) => {
        connection.query('INSERT INTO `users` (`name`,`gender`,`dob`,`username`,`password`) VALUES (?,?,?,?,?)', [name, gender, dob, username, password], function (error, results, fields) {
            if (error) throw error;
        });
        return "success";
    }

    //service update user
    static update = (id, name, gender, dob) => {
        connection.query(`UPDATE users SET name='${name}',gender='${gender}',dob='${dob}' WHERE id='${id}'`, function (error, results, fields) {
            if (error) throw error;
        });
        return "success";
    }
    static setAvatar = (id, path) => {
        connection.query(`UPDATE users SET avatarpath='${path}' WHERE id='${id}'`, function (error, results, fields) {
            if (error) throw error;
        });
    }
    //service delete user
    static destroy = async (id) => {
        let userData = new Promise((resolve, reject) => {
            connection.query('DELETE  FROM `users` WHERE id=?', [id], function (error, results, fields) {
                if (error) return reject(error);
                resolve(results)
            });
        });
        let result = await userData;
        return result;
    }

}

module.exports = { UserService };