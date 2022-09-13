

const { Sequelize, DataTypes } = require("sequelize");

const db = require('../utils/db');
//  const Student =require('./student');

const sequelize = db.sequelize;
// const student = db.student
//  console.log("this is studentttttttttttt",student);
const assignment_data = sequelize.define("assignment_data", {


  assignment_id: {

    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,

  },

  topic: {

    type: DataTypes.STRING,

  },
  start_date: {
    type: DataTypes.DATE,
  },
  due_date: {
    type: DataTypes.DATE,
  },
  submissions: {
    type: DataTypes.INTEGER
  },
  total_student: {
    type: DataTypes.INTEGER
  },
  submission_percentage: {
    type: DataTypes.STRING
  },
  Solution_uplaod: {
    type: DataTypes.STRING
  },
  Student_git: {
    type: DataTypes.STRING
  },
  faculty_git_push: {
    type: DataTypes.STRING
  }


}, {
  freezeTableName: true,
  timestamps: false
},
);





module.exports = assignment_data;