const { connection } = require('../database/connection');
class MemberService {

    static getAll = async () => {
        let memberData = new Promise((resolve, reject) => {
            try {
                connection.query('SELECT * FROM members', function (error, results, fields) {
                    if (error) return reject(error);
                    resolve(results)
                });
            }
            catch (error) {
                return error;
            }
        });
        let result = await memberData;
        return result;
    }
    static getById = async (id) => {
        let memberData = new Promise((resolve, reject) => {
            connection.query('SELECT * FROM members WHERE id = ?', [id], function (error, results, fields) {
                if (error) return reject(error);
                resolve(results)
            });
        });
        let result = await memberData;
        return result;
    }
    static getByUsername = async (username) => {
        let memberData = new Promise((resolve, reject) => {
            connection.query('SELECT * FROM members WHERE username = ?', [username], function (error, results, fields) {
                if (error) return reject(error);
                resolve(results)
            });
        });
        let result = await memberData;
        return result;
    }
    static getByEmail = async (email) => {
        let memberData = new Promise((resolve, reject) => {
            connection.query('SELECT * FROM members WHERE email = ?', [email], function (error, results, fields) {
                if (error) return reject(error);
                resolve(results)
            });
        });
        let result = await memberData;
        return result;
    }


    static insert = (first_name, last_name, username, email, date_of_birth) => {
        connection.query(`INSERT INTO members (first_name,last_name,username,email,date_of_birth) VALUES ('${first_name}','${last_name}','${username}','${email}','${date_of_birth}')`, (error, data) => {
            if (error) throw error;
        });
        return "success";
    }
    static update = (id, first_name, last_name, username, email, date_of_birth) => {
        connection.query(`UPDATE members SET first_name='${first_name}',last_name='${last_name}',username='${username}',email='${email}',date_of_birth='${date_of_birth}',updated_at=curdate() WHERE id=${id}`, (error, data) => {
            if (error) throw error;
        });
        return "updated sucessfully";
    }
    static destroy = (id) => {
        connection.query(`DELETE FROM members WHERE id=${id}`, (error, data) => {
            if (error) throw error;

        });
        return "deleted sucesfully";
    }

}
module.exports = { MemberService }