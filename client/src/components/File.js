import React,{useEffect,useState} from 'react'
import axios from 'axios';
function File() {
    const [file, setFile] = useState();
    const [file1, setFile1] = useState();
    const [resp,setres] = useState("waiting for upload...");
    const [AssignResp,setAssignRes] = useState("waiting for upload...");
    // const [fileName, setFileName] = useState("");

const saveFile = (e) => {
      // console.log(e.target.files[0],e.target.files[0].name);
      setFile(e.target.files[0]);
      // setFileName(e.target.files[0].name);
    };

    const saveFile1 =(e) => {
        // console.log(e.target.files[0],e.target.files[0].name);
        setFile1(e.target.files[0]);
        // setFileName(e.target.files[0].name);
      };

    const uploadFile = async (e) => {
        // console.log(file,fileName);
        const data = new FormData();
    data.append( 'file', file);
        
        try {
          const res = await axios.post(
            "http://localhost:5000/upload",
            data
          );
            console.log(res);
            setres(res.data.message)
        } catch (ex) {
          console.log(ex);
        }
    };
    
    const uploadAssignmentFile= async (e) => {
        // console.log(file,fileName);
        const data = new FormData();
    data.append( 'file', file1);
        
        try {
          const res = await axios.post(
            "http://localhost:5000/upload_feedback",
            data
          );
            console.log(res);
            setAssignRes(res.data.message)
            
        } catch (ex) {
          console.log(ex);
        }
    };
  return (
      <div className='main'>
          <div className='body'>
          <h3>Enter your Student data sheet here</h3>
          <input type="file" onChange={saveFile} /> <button onClick={uploadFile}>Upload Student Sheet</button>
              <p>{resp}</p>
          
          <h3>Enter your Assignment data sheet here</h3>
          <input type="file" onChange={saveFile1} /> <button onClick={uploadAssignmentFile}>Upload Assignment Sheet</button>
              <p>{AssignResp}</p>
          </div>
          
    </div>
  )
}

export default File