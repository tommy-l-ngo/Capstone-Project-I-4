import React from 'react'
import Select from 'react-select'
//import "./firebase.js"
import "./confg.js"
import { child,get, getDatabase} from "firebase/database";
import { ref} from "firebase/database"



const options=[
    // label displays name and value is pulled from database
   {label:'', value:''}, 
]

//function to gather student names and id's for drop down selection
function getUserData() 
{ 
    var student_ids = new Array();
    var count = 0; 
    const db = ref(getDatabase()); 
    get(child(db,"users/"))
    .then((snapshot)=>{
        snapshot.forEach(function(childSnapshot){
        if(childSnapshot.child("role").val() == "student") //gathering only student names for selection
        {
           var id = childSnapshot.child("eUID").val(); 

           options.push({label:id,value:id});   
        }
        })  
    })
}

// multiselect function to allow user to select students based off of id
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