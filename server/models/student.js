

const { Sequelize, DataTypes } = require("sequelize");

const db = require('../utils/db');
const Batch=require('./batch')

const sequelize = db.sequelize;


const Student = sequelize.define("student", {

  Student_id: {

    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,

  },


  name: {

    type: DataTypes.STRING,

  },
  emailid: {
    type: DataTypes.STRING,
    unique: true
  },

  phone: {
    type: DataTypes.STRING,

  },

  // batch_id: {
  //   type: DataTypes.INTEGER,
    
  // },
  // batch_name: {
  //   type: DataTypes.STRING,
  // }


}
  ,
  {
    freezeTableName: true,
    timestamps: false
  },
);




module.exports = Student
