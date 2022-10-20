import React, { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase';
import 'firebase/storage';

const Attachments = () => {
    // States for data and image
    const [data, setData] = useState([]);
    
    const fullPath = window.location.href;
    const projectPath = fullPath.substring(fullPath.lastIndexOf('/') + 1)
    const storageRef = ref(storage, `/projects/${projectPath}/`);

    const listItem = () => {
        storageRef.listAll()
          .then(res => {
            res.items.forEach((item) => {
              setData(arr => [...arr, item.name]);
            })
          })
          .catch(err => {
            alert(err.message);
          })
      }

  return (
    <div className="img-grid">
      {/* <button onClick={listItem}>List Item</button>
        <br /><br />
        {
          data.map((val) => (
            <h2>{val}</h2>
          ))
        } */}
    </div>
  )
}

export default Attachments;