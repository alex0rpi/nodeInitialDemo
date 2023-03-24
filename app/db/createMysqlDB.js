const mysql = require('mysql2/promise')
const { mysqlConfig } = require('../config/mysqlConfig')

exports.designDB = async () => {
    try {
        const dbcnx = await mysql.createConnection({
            host: mysqlConfig.host,
            port: mysqlConfig.port,
            user: mysqlConfig.user,
            password: mysqlConfig.password
        })
        await dbcnx.query(`CREATE DATABASE IF NOT EXISTS \`${mysqlConfig.name}\``)
        console.log("Database created");
    } catch (error) {
        console.log("Error connecting o creating database"+error.message);
    }
}