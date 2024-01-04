import React, { useState } from "react";
import './todobeginner.css';
import { v4 as uuidv4 } from "uuid";
import TodoBeginnerForm from "./TodoBeginnerForm";
import TodoBeginner from "./TodoBeginner";
import EditTodoBeginnerForm from "./EditTodoBeginnerForm";
uuidv4();

const TodoBeginnerWrappper = () => {

    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        //bất đồng bộ nên câu lệnh log sẽ được chạy trước
        setTodos([...todos, {
            id: uuidv4(),
            task: todo,
            completed: false,
            isEditing: false
        }])
        console.log("Todo List : ", todos);
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const editTodo = (id) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo))
    }

    const editTask = (updateTask, id) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, task: updateTask, isEditing: !todo.isEditing } : todo))
    }

    const toggleComplete = (id) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }

    return (
        <div className="TodoWrapper">
            <h1>Get Things Done!</h1>
            <TodoBeginnerForm addTodo={addTodo} />
            {todos.map((todo, index) => {
                return (
                    todo.isEditing ? (
                        <EditTodoBeginnerForm editTask={editTask} todo={todo} />
                    ) : (
                        <TodoBeginner task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                    )
                )
            })}
        </div>
    )
};

export default TodoBeginnerWrappper;