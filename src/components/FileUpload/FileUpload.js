import React, {useState} from 'react';
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Progress from './Progress';
import './FileUpload.css'
import '../Dashboard/Button.css'

function FileUpload() {

  const [file, setFile] = useState()

  // progress
  const [percent, setPercent] = useState(0)

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  function handleSubmit(event) {
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);
 
    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
          const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // Clear percentage
          setTimeout(() => setPercent(0), 10000);

          // update progress
          setPercent(percent);
      },
      (err) => console.log(err),
      () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
          });
        }
    );
  }

  return (
    <div className="File-Upload">
        <form onSubmit={handleSubmit}>
          <h4>Upload a File</h4>
          <div className='fileSelector'>
            <input type="file" onChange={handleChange}/>
            <button className='uploadBtn' type="submit">Upload</button>
          </div>
          <div className='progress-bar'>
            <Progress percentage={percent}/>
          </div>
        </form>
    </div>
  );
}

export default FileUpload;