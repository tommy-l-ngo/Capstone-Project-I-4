import React, {useEffect, useState} from 'react'
import Select from 'react-select'
//import "./firebase.js"
import "./confg.js"
import { child,get, getDatabase} from "firebase/database";
import { ref} from "firebase/database"


/*
All this needed to be in a useEffect with an empty dependancy so that it is only called ONCE.
This is why our Select was so slow, it kept rerendering the same options. and options should be
a state variable, NOT just a regualar variable, or we'll lose the options on rerender (like when
picking a single option). Also, please try to abstain from using global variables. I've read that
that could have disastrous effects with other files if not managed properly.

const options=[ ]

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
*/


// multiselect function to allow user to select students based off of id
function MultiSelect(props){

    //getUserData()

    //const options=[]
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const db = ref(getDatabase()); 
        get(child(db,"users/"))
        .then((snapshot)=>{
            snapshot.forEach(function(childSnapshot){
            if(childSnapshot.child("role").val() == "student") //gathering only student names for selection
            {
            var id = childSnapshot.child("eUID").val(); 

            //options.push({label:id,value:id});
            setOptions(options => [...options, {label:id,value:id}])   
            }
            })  
        })
    }, [])
    

    return( 
    <div>
        <Select
        isMulti 
        options={options}
        onChange={props.onChange}
        value={props.selected}
        />
    </div>
    )
}

export default MultiSelect;