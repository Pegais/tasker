
const db = require('../utils/db');
console.log(db);
// const feedback_test = db.feedback_test;
const student = db.student;
const {findbatchid} = require("./batch_controller")

// const Employee = db.Employee;
module.exports = {

   
    insertstudent,
    
    getAllStudent,
    deleteStudent,
    findStudentid,



};




async function insertstudent(name,emailid,phone,batch_name) {
    // console.log( phone);
    // console.log(batch_name,"this is from here");
    try { 
        let data = await findbatchid(batch_name);
        data = data.toJSON();
       let batch_id=data.batch_id
        // console.log(data);
        
        await student.create({ name,emailid,phone,batch_id,batch_name });
    } catch (error) {
        console.log(error);
    }

}



async function getAllStudent() {

    const student_data = await student.findAll();

    return student_data;


}

async function findStudentid(name) {
    const id =await student.findOne({
        where: {
            name:name
        }
    });
    return id;
}


async function deleteStudent() {

    // const studentdata = await getAllStudent();

    await student.destroy({
        where: {},
        truncate: true
    });


}