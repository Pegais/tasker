const config = require('./config.js');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
// const {student} =

module.exports = db = {};

// create db if it doesn't already exist
const { host, port, user, password, database } = config.database;

const pool = mysql.createPool({ host, port, user, password });

pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

// connect to db
const sequelize = new Sequelize(database, user, password, {
    dialect: 'mysql',
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle

    }
}

);


db.sequelize = sequelize;

db.batch = require("../models/batch");
db.student = require("../models/Student")
db.assignment_data = require("../models/Assignment")


db.batch.hasMany(db.student, {
    foreignKey: "batch_id",
    as:"student"
})
db.student.belongsTo(db.batch, {
    foreignKey: "batch_id",
    as:"batch"
})

db.batch.hasMany(db.assignment_data, {
    foreignKey: "batch_id",
    as:"assignment_data"
})
db.assignment_data.belongsTo(db.batch, {
    foreignKey: "batch_id",
    as:"batch"
})



sequelize.sync({force:true});




// // sync all models with database
// async function run() {
    

//     await 
// }
// run()