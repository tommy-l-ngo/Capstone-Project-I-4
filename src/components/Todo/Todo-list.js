import { toHaveFocus } from "@testing-library/jest-dom/dist/matchers";
import { useState } from "react";
import Navbar from "../Dashboard/Navbar"
import { Todo } from "./Todo";
import { TodoForm } from "./Todo-Form";
import { getDatabase, get, ref, remove, update} from "firebase/database";
import { getAuth } from "firebase/auth";
import './Todo.css'

export function Todolist(props,{data}){
    const db = getDatabase();
    const user = getAuth().currentUser;
    const userEUID = user.displayName;
    const todoid = userEUID+"_"+ Date.now()
    const [todos, setTodos] = useState([]);
    const [setId] = useState(" ")
    const [setText] = useState(" ")
    const [input, setIput]= useState(props.edit ? props.edit.value :'');
    //Fix Me connect databse

    /*function getTodo(){get(ref(db, "todos/" + userEUID + "/" + todoid)).then((snapshot) =>{
        if(snapshot.exists()){
            setId(snapshot.val().id)
            setText(snapshot.val().Text)
        }
    })}*/
    
    //add todo
    const addTodo = todo =>{
        if (!todo.text || /^\s*$/.test(todo.text)){
            return
        }
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
        console.log(...todos) 
    }

    // update todo
    const updateTodo = (todoId, newValue) =>{
        if(!newValue.text || /^\s*$/.test(newValue.text)){
            return
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
        update(ref(db,"todos/" + userEUID + "/" + todoid),{
            text: input
        })
    }
    
    //remove todo
    const removeTodo =id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArr);
        remove(ref(db, "todos/"+userEUID+"/"+todoid))
    }

    //set complete todo
    const completeTodo = id => {
        let updatedTodos = todos.map(todo=>{
            if(todo.id === id){
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setTodos(updatedTodos)
    }

    return(
        <>
            <Navbar />
            <h1>Todo List </h1>
            <TodoForm onSubmit={addTodo} />
            <Todo 
            todos={todos} 
            completeTodo={completeTodo} 
            removeTodo={removeTodo} 
            updateTodo={updateTodo}
            />
        </>
    )
}