import logo from './logo.svg';
import './App.css';
import firebaseconfig from './firebase_config.js';
import React from "react"; 
import firebase from "firebase/compat/app"
import {getDatabase, ref, set} from "firebase/database"
import "./database_handler"
import db from './database_handler';
import { dblClick } from '@testing-library/user-event/dist/click';
import { render } from 'react-dom';
//import { Button } from 'react-bootstrap'; 
class App extends React.Component{
  constructor(props){
    super(props); 
    
      
    };
    run_test() 
    {
        return (
          <div>
            <Button onClick={db.writeUserData()}></Button>

          </div> 
        )
       
    }
    
    

  }
  
  
 
  




export default App; 

