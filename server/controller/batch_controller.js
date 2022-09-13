
const db = require('../utils/db');
// const batch= require('../models/batch')
const batch = db.batch
const student = db.student;


module.exports = {
    insertBatch,
    findbatchid,
    // findAllBatch_data
    // getbatchdetail
}



async function insertBatch(batch_name) {
    console.log(batch_name);
    try {
        
        await batch.create({batch_name});
    } catch (error) {
        console.log(error);
    }

}

async function findbatchid(name) {
   try {
    let batch_data = await batch.findOne({ where:{ batch_name:name } });
    return batch_data;
    //    console.log(batch_data);
   } catch (error) {
    console.log(error);
   }
}


// async function findAllBatch_data() {
  

//     console.log(data);
// }