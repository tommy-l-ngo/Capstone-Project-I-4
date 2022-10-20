import { useState } from "react";
import Navbar from "../Dashboard/Navbar"
import { Todo } from "./Todo";
import { TodoForm } from "./Todo-Form";
import { getDatabase, ref, remove, update, onValue} from "firebase/database";
import { getAuth } from "firebase/auth";
import './Todo.css'

export function Todolist(){
    const db = getDatabase();
    const user = getAuth().currentUser;
    const userEUID = user.displayName;
    const [todos, setTodos] = useState([]);

    useState(()=>{
        const temp = onValue(ref(db, "todos/" + userEUID), (snapshop)=>{
            let todoArr = []
            snapshop.forEach((childSnapshot)=>{
                var todoId = childSnapshot.val().id;
                var todoIsComplete = childSnapshot.val().isComplete;
                var todoText = childSnapshot.val().text;
                var userTodos = {id: todoId, isComplete: todoIsComplete, text: todoText}
                todoArr.push(userTodos)
            })
            setTodos(todoArr)
        })
        return()=>temp()
    },[])
    
    const addTodo = todo =>{
        if (!todo.text || /^\s*$/.test(todo.text)){
            return
        }
        else{
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
        console.log(todo,...todos)
        }
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