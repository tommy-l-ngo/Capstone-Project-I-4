import { toHaveFocus } from "@testing-library/jest-dom/dist/matchers";
import { useState } from "react";
import Navbar from "../Dashboard/Navbar"
import { Todo } from "./Todo";
import { TodoForm } from "./Todo-Form";
import { getDatabase, get, ref} from "firebase/database";
import { getAuth } from "firebase/auth";
import './Todo.css'

export function Todolist({data}){
    const db = getDatabase();
    const user = getAuth().currentUser;
    const userEUID = user.displayName;
   
    const [todos, setTodos] = useState([]);
    const [setId] = useState(" ")
    const [setText] = useState(" ")
    //Fix Me connect databse

    /*get(ref(db, "todos/" + userEUID + "/" + todokey)).then((snapshot) =>{
        if(snapshot.exists()){
            setId(snapshot.val().id)
            setText(snapshot.val().Text)
        }
    })*/
    
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
    }
    
    //remove todo
    const removeTodo =id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArr);
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