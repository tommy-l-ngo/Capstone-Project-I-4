import logo from './logo.svg';
import './App.css';
import firebaseconfig from './firebase_config.js';
import React from "react"; 
import firebase from "firebase/compat/app"
import {getDatabase, ref, set} from "firebase/database"
class database_handler extends React.Component{
  constructor(props){
    super(props); 
    firebase.initilizeApp(firebaseconfig.firebase);
    this.state = {
      developers: []
      
    };
    

  }
  
  writeUserData(project_name,project_description,project_tasks,project_date)
  {

    
    const db = getDatabase();
     
    
    set(ref(db,'projects/ ' + project_name),{
       description: project_description, 
       tasks: project_tasks, 
       date: project_date

    });
    

  }
  getUserData() 
  {
      let ref = Firebase.database().ref("/projects"); 
      return ref.once('value', (snapshot) => {
           const data = snapshot.val() 

      })
      return data; 

      
      
  }
  
 
  }

  
 
  



const db = new database_handler(); 
export default db;  

