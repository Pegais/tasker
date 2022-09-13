

const { Sequelize, DataTypes } = require("sequelize");
 
const db = require('../utils/db');
 const Student =require('./student');
 
const  sequelize = db.sequelize;
// const student = db.student
//  console.log("this is studentttttttttttt",student);
const Batch = sequelize.define("batch", {
  
 
 batch_id: {
 
   type: DataTypes.INTEGER,
   autoIncrement: true,
   allowNull: false,
   primaryKey: true,
 
 },

batch_name: {
 
   type: DataTypes.STRING,
   unique:true
  },
 

},{
  freezeTableName: true,
  timestamps:false
}, 
);





module.exports = Batch;