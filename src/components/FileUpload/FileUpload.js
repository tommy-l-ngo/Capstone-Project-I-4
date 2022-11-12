import React, {useEffect, useState} from 'react';
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import Progress from './Progress';
import './FileUpload.css'
import '../Dashboard/Button.css'
import Message from './Message';
import MessageSuccess from './MessageSuccess';
import { getAuth } from "firebase/auth";
import { getDatabase, ref as ref_db, get, push, child } from "firebase/database";

function FileUpload() {

  const [file, setFile] = useState()

  // progress
  const [percent, setPercent] = useState(0)
  const [progress, setProgress] = useState(false)

  const [message, setMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const fpath = window.location.href;
  const ppath = fpath.substring(fpath.lastIndexOf('/') + 1)
  const projName = ppath.replace(/_/g, ' ');
  const [notifUsers, setNotifUsers] = useState([]);

  const dbRef = ref_db(getDatabase());
  const user = getAuth().currentUser;
  var name = "No user";
  var currUserID;

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  function handleNotifs(event) {
    const user = getAuth().currentUser;
    const db = getDatabase();

    let dbRef = ref_db(db, "notifications/");
    push(dbRef, {
      name: `uploaded file to "${projName}":  ${file.name}`,
      user_id: user.displayName,
      date: new Date().toLocaleString(),
      notify: notifUsers,
    })
  }

  useEffect(() => {
    var unsubcribe = getAuth().onAuthStateChanged(function(user) {
        if (user) {
          get(child(dbRef, "projects"))
          .then((snapShot) => {
            let projmatch = false;
            if (snapShot.exists()) {
              // Matches projects that belong to user
              projmatch = snapShot.forEach((subSnap) => {
                //console.log(currUserID);
                //console.log(subSnap.val().user_id);
                if (subSnap.val().name === projName)
                {
                  setNotifUsers(subSnap.val().students);
                }
              });
            }
          })
        } else {
        // No user is signed in.
      }
    })
    //unsubcribe();
  }, []);
  
  function handleSubmit(event) {
    if (!file) {
      //alert("Please upload an image first!");
      setMessage('No file selected')
    }
    else {
      setProgress(true);
      const fullPath = window.location.href;
      const projectPath = fullPath.substring(fullPath.lastIndexOf('/') + 1)
      const storageRef = ref(storage, `/projects/${projectPath}/${file.name}`);
 
      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // // Clear percentage
          // setTimeout(() => setPercent(0), 10000);

          // update progress
          setPercent(percent);
        },
        (err) => {
          console.log(err)
        },
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            // Clear percentage
            setTimeout(() => setPercent(0), 3000);
            setSuccessMessage('File successfully uploaded!')
            handleNotifs();
            setTimeout(() => document.getElementById("fileSubmit").reset(), 3000);
            setTimeout(() => setFile(''), 1000);
            setTimeout(() => setProgress(''), 1000);
          });
        }
      );
    }
  }

  return (
    <div className="File-Upload">
        {message ? (<Message msg={message} />) : null}
        {successMessage ? <MessageSuccess msg={successMessage} /> : null}
        <form id="fileSubmit">
          <h4>Upload a File</h4>
          <div className='fileSelector'>
            <input type="file" onChange={handleChange}/>
            <button className='uploadBtn' type="button" onClick={handleSubmit}>Upload</button>
          </div>
          <div className='progress-bar'>
          {progress ? <Progress percentage={percent} /> : null}
          </div>
        </form>
    </div>
  );
}

export default FileUpload;