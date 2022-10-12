
import { getAuth } from "firebase/auth";
import { useState, useEffect, useRef } from "react";
import { getDatabase, set, ref} from "firebase/database";

export function TodoForm(props){
    const user = getAuth().currentUser;
    const userEUID = user.displayName;
    const [input, setIput]= useState(props.edit ? props.edit.value :'');
    const inputRef = useRef(null)
    const db =getDatabase()
    const todoid = userEUID+"_"+ Date.now()
    //Math.floor(Math.random()*1000000)
    useEffect(() =>{
        inputRef.current.focus()
    })
    
    const handleChange =e=>{
        setIput(e.target.value)
    }
    const handleSubmit=e=>{
        e.preventDefault();
        //fix me connect database
        props.onSubmit({
            id: todoid,
            text: input
        })
        set(ref(db, "todos/" + userEUID + "/" + todoid),{
            id: todoid,
            text: input
        })

        setIput('')
    }
    return(
        <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
    )
}