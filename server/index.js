require('dotenv').config();
const express = require("express")
const cors = require("cors")
const helmet = require("helmet");
const morgan = require("morgan");
const readXlsxFile = require('read-excel-file/node')
const app = express();
const fs = require('fs');
const mysql = require('mysql');
const path = require('path');


const { findStudentid, insertstudent, deleteStudent} = require('./controller/controller');
const { insertBatch, findbatchid,findAllBatch_data } = require('./controller/batch_controller')
// *********************************************************************************
app.use(express.json());//enabling json format req and response.
app.use(cors());//enabling cross origin response 
app.use(helmet());// provides security
app.use(morgan());// provides a logger to logout all api request.

// ***********************************************************************************
const db = require('./utils/db')
const sequelize = db.sequelize;
const student = db.student;
const batch = db.batch;
// const feeback_test = db.feeback_test;
// console.log(db);

  

// ********************************************************************************

const Port = process.env.PORT || 5000
// ************************************************

// app.use("/upload",require("./filerouter/fileRouter"))
const multer = require("multer");
const { log } = require('console');
const { ifError } = require('assert');
const storageA = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const storageB = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public_feedback')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storageA }).single('file');

const feedback_upload = multer({ storage: storageB }).single('file');

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err.message)
        }
        return res.status(200).json({message:"success"})
    })
})
app.post('/upload_feedback', (req, res) => {
    feedback_upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err.message)
        }
        return res.status(200).json({message:"success"})
    })
})




sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

let Student_data_Arr = []
// try {
//     async function readexcelfile_infolder() {
//         let Batch_name_Arr = [];
//         let folderdata = fs.readdirSync('./public')




//         for (let index = 0; index < folderdata.length; index++) {

//             let file_ext = path.extname(folderdata[index])
//             // console.log(file_ext);



//             if (file_ext == '.xlsx') {

//                 let file_name = folderdata[index].split('-').pop();
//                 let batch_name = file_name.split('.').shift()
//                 if (!Batch_name_Arr.includes(batch_name)) {
//                     console.log(batch_name, index);
//                     Batch_name_Arr.push(batch_name);



//                     // **************************************READING FILE INSIDE FOLDER TO UPLOAD STUDENT DATA*********************************

//                     let data = await readXlsxFile(`./public/${folderdata[index]}`)
//                     let student_data = {};
//                     for (i in data) {
//                         if (i > 0) {
//                             // console.log(data[i]);
//                             for (j in data[i]) {
//                                 // await insertstudent(data[i][0], data[i][1], data[i][2])
//                                 student_data['name'] = data[i][0];
//                                 student_data['emailid'] = data[i][1];
//                                 student_data['phone'] = data[i][2];
//                                 student_data['batch_name'] = data[i][3];


//                             }
//                             Student_data_Arr.push({ ...student_data });
//                         }
//                     }
//                 }


//             }
//         }






//         try {



//             // uploading batch_name to database here;*****************************

//             for (let i = 0; i < Batch_name_Arr.length; i++) {

//                 await insertBatch(Batch_name_Arr[i]);
//             }



//             console.log(Student_data_Arr.length);
//             let data;
//             for (let i = 0; i < Student_data_Arr.length; i++) {
//                 let name = Student_data_Arr[i].name;
//                 let emailid = Student_data_Arr[i].emailid;
//                 let phone = Student_data_Arr[i].phone;


//                 // console.log(Student_data_Arr[i].batch_name);
//                 let batch_name = Student_data_Arr[i].batch_name
//                 console.log(batch_name);
                

//                 try {

//                     await insertstudent(name, emailid, phone, batch_name)

//                 } catch (error) {
//                     console.log(error);
//                 }
//                 //  data = await findbatchid(batch_name);
//                 // console.log(data);

//             }



//         } catch (error) {
//             console.log(error);
//         }





//         //**** */





//     }
//     readexcelfile_infolder()
   
  

 




//     let Arr = [];

//     // async function read_feeback() {
//     //     let data = fs.readdirSync('./public_feedback');
//     //     if (data.length > 0) {
//     //         for (let i = 0; i < data.length; i++) {
//     //             let reader = await readXlsxFile(`./public_feedback/${data[i]}`)
//     //             //                 //                 // *******************************************READING FEEDBACK ********************************

//     //             let obj = {};

//     //             for (i in reader) {
//     //                 if (i >= 2) {
//     //                     // console.log(reader[i]);
//     //                     for (j in reader[i]) {
//     //                         // console.log(reader[i][1])


//     //                         obj['Date'] = reader[i][0];
//     //                         obj['Module'] = reader[i][1];
//     //                         obj['Student_name'] = reader[i][2];
//     //                         obj['Technical_Rating'] = reader[i][3];
//     //                         obj['Engagement_Rating'] = reader[i][4];
//     //                         obj['Additional_rating'] = reader[i][5];

//     //                         // search_student(obj['Student_name'])
//     //                         // 
//     //                     }
//     //                     // console.log(obj, sheetNames[x]);
//     //                     // console.log(obj);

//     //                     Arr.push({ ...obj })

//     //                 }
//     //             }

//     //         }
//     //     }




//     //     if (Arr.length != 0) {
//     //         // console.log(Arr, "this is prrrrrrrrrrrrrrint array");

//     //         for (let index = 0; index < Arr.length; index++) {
//     //             // let name = Arr[index].Student_name;
//     //             let Date = Arr[index].Date;
//     //             let Student_Name = Arr[index].Student_name;
//     //             let Module_Name = Arr[index].Module;
//     //             let Technical_Rating = Arr[index].Technical_Rating;
//     //             let Engagement_Rating = Arr[index].Engagement_Rating;
//     //             let Additional_rating = Arr[index].Additional_rating;

            
                
                
                
//     //             try {
                    
//     //                 await insertfeedback(Date, Module_Name,Student_Name, Technical_Rating, Engagement_Rating, Additional_rating)

                   


//     //             } catch (error) {
//     //                 console.log(error);
//     //             }

//     //         }
//     //     }
//     // }
//     // read_feeback()

   
// }
// catch (error) {
//     console.log(error);
// }

app.get('/data', async(req, res) => {
    let data =  await  batch.findAll({
        include: [{
            model: student,
            as:"student"
        }],
      
    })
    console.log(data);
    res.json({data})
})




app.listen(Port, () => {
    console.log("backened api started on 5000 Port");
})


