import { toHaveFocus } from "@testing-library/jest-dom/dist/matchers";
import { useState } from "react";
import Navbar from "../Dashboard/Navbar"
import { Todo } from "./Todo";
import { TodoForm } from "./Todo-Form";
import { getDatabase, get, ref, remove, update} from "firebase/database";
import { getAuth } from "firebase/auth";
import './Todo.css'

export function Todolist(props){
    const db = getDatabase();
    const user = getAuth().currentUser;
    const userEUID = user.displayName;
    const todoid = userEUID+"_"+ Date.now()
    const [todos, setTodos] = useState([]);
    const [setId] = useState(" ")
    const [setText] = useState(" ")
    const [input, setIput]= useState(props.edit ? props.edit.value :'');
    //Fix Me get todos from databse

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
        console.log(todo,...todos) 
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
        remove(ref(db, "todos/"+userEUID+"/"+id))
    }

    //set complete todo true or false
    const completeTodo = id => {
        let updatedTodos = todos.map(todo=>{
            if(todo.id === id){
                if(todo.isComplete = !todo.isComplete){
                update(ref(db,"todos/" + userEUID + "/" + id),{
                    isComplete: true
                    })
                }
                else{
                    update(ref(db,"todos/" + userEUID + "/" + id),{
                        isComplete: false
                    })
                
                }
            }
            return todo
        })
        setTodos(updatedTodos)
    }

    return(
        <>
            <Navbar />
            <div className="todo-list">
                <h1>Todo List </h1>
                <TodoForm onSubmit={addTodo} />
                <Todo 
                todos={todos} 
                completeTodo={completeTodo} 
                removeTodo={removeTodo} 
                updateTodo={updateTodo}
                />
            </div>
        </>
    )
}