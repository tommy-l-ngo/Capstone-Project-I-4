import React from 'react'
import Select from 'react-select'
//import "./firebase.js"
import "./confg.js"
import { child,Database,DataSnapshot,get, getDatabase, push, query, update } from "firebase/database";
import firebase from "firebase/compat/app"
import { ref, set} from "firebase/database"



const options=[
    
   {label:'', value:''},
]
function getUserData() 
{ 
    var student_ids = new Array();
    var count = 0; 
    const db = ref(getDatabase()); 
    get(child(db,"users/"))
    .then((snapshot)=>{
        snapshot.forEach(function(childSnapshot){
        if(childSnapshot.child("role").val() == "student")
        {
          
        
           var id = childSnapshot.child("eUID").val(); 

           options.push({label:id,value:id});
           
          
           
            
          
           
         
           

          
            
        }
       

        })
        
    })

    
    
   
    
    
    
    
    
}


// put student names from database here ^

function MultiSelect(props){

    getUserData()
   
    return <div>
        <Select
        isMulti 
        options={options}
        onChange={props.onChange}
        />
    </div>
}

export default MultiSelect;