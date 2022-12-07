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

  // Current File
  const [file, setFile] = useState()

  // progress
  const [percent, setPercent] = useState(0)
  const [progress, setProgress] = useState(false)

  // Alert message
  const [message, setMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Get URL pathname
  const fpath = window.location.href;
  const ppath = fpath.substring(fpath.lastIndexOf('/') + 1)
  const projName = ppath.replace(/_/g, ' ');
  const [notifUsers, setNotifUsers] = useState([]);

  const dbRef = ref_db(getDatabase());
  const user = getAuth().currentUser;
  var name = "No user";
  var currUserID;

  // On File Change event
  function handleChange(event) {
    setFile(event.target.files[0])
  }

  // Create notification for when a file is uploaded
  function handleNotifs(event) {
    const user = getAuth().currentUser;
    const db = getDatabase();

    let dbRef = ref_db(db, "notifications/"); // Reference notifications database
    push(dbRef, {
      name: `uploaded file to "${projName}":  ${file.name}`,  // Message
      user_id: user.displayName,                              // User invoking the notification
      date: new Date().toLocaleString(),                      // Date of notification
      notify: notifUsers,                                     // Users to notify
    })
  }

  // Search for project and the users in the project to notify
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
  
  // Event to handle file submission
  function handleSubmit(event) {
    if (!file) {
      //alert("Please upload an image first!");
      setMessage('No file selected')              // Alert that no file is selected
    }
    else {
      setProgress(true);
      const fullPath = window.location.href;                                          // Get full URL path
      const projectPath = fullPath.substring(fullPath.lastIndexOf('/') + 1)           // Get the last instance after the last /
      const storageRef = ref(storage, `/projects/${projectPath}/${file.name}`);       // Reference database for that project
 
      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, file);                      // Upload file to ref

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100                   // Progress bar math
          );

          // // Clear percentage
          // setTimeout(() => setPercent(0), 10000);

          // update progress
          setPercent(percent);                                                        // Set percentage
        },
        (err) => {
          console.log(err)
        },
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {                     // Console logs the download link
            console.log(url);
            // Clear percentage
            setTimeout(() => setPercent(0), 3000);
            setSuccessMessage('File successfully uploaded!')
            handleNotifs();
            setTimeout(() => document.getElementById("fileSubmit").reset(), 3000);    // Reset file submission
            setTimeout(() => setFile(''), 1000);                                      // Reset file state
            setTimeout(() => setProgress(''), 1000);                                  // Reset progress bar state
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