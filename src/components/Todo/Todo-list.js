import { toHaveFocus } from "@testing-library/jest-dom/dist/matchers";
import { useState, useEffect } from "react";
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

    function getTodo(){
        get(ref(db, "todos/" + userEUID + "/")).then((snapshot) =>{
        if(snapshot.exists()){
            snapshot.forEach( (eventShot) => {
                var tdid = eventShot.val().id;
                var tdtext = eventShot.val().text;
                var todo = {id: tdid, text: tdtext}
                todos.push(todo);
            })
            setTodos(todos); // add todos to ui list
            console.log(todos);
        }
        else{
            console.log("No todos");
        }
    })}
    
    //add todo
    const addTodo = todo =>{
        if (!todo.text || /^\s*$/.test(todo.text)){
            return
        }
        var newTodo = {id: todoid, text: todo.text}
        todos.push(newTodo);
        setTodos(todos);
        console.log(...todos);
        getTodo();
    }

    // update todo
    const updateTodo = (todoId, newValue) =>{
        if(!newValue.text || /^\s*$/.test(newValue.text)){
            return
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
        //update(ref(db,"todos/" + userEUID + "/" + todoId),{
        //    text: input
        //})
    }
    
    //remove todo
    const removeTodo =id => {
        //const removeArr = [...todos].filter(todo => todo.id !== id)
        //setTodos(removeArr);
        remove(ref(db, "todos/"+userEUID+"/"+id))
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

    useEffect(() => {
        getTodo();
    },[]); // FIX ME: should run on page load

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