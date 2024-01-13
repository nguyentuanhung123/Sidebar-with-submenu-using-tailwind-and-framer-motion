import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import TodoBeginnerForm from "./TodoBeginnerForm";
import TodoBeginner from "./TodoBeginner";
import EditTodoBeginnerForm from "./EditTodoBeginnerForm";
import { useEffect } from "react";
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

    const getMessage = () => {
        const percentage = numberConplete / numberTotal * 100;
        if (percentage === 0) {
            return 'Try to do at least one';
        }
        if (percentage === 100) {
            return 'Nice job for today!';
        }
        return 'Keep it going';
    }

    const numberConplete = todos.filter((todo) => todo.completed).length;

    const numberTotal = todos.length;


    useEffect(() => {
        // Vấn đề : Nếu chúng ta chỉ setItem thì khi refresh app thì những todo đã được thêm todos vào sẽ bị mất đi
        // Khi chúng ta refresh hoặc thêm todo vào todos thì thì localStorage.setItem trong useEffect này sẽ được chạy 
        // => Nó sẽ update (set) lại localStorage của chúng ta như todos mà chúng ta đã mặc định 
        // => Chúng ta mới chỉ thêm todo vào todos chứ không lưu nó lại
        // Do chúng ta đã để mặc định là [] nên khi refresh todos trong localStorage mà chúng ta đã thêm sẽ bị update (set) là rỗng
        // Giải pháp khi todos sắp bị update là một mảng rỗng thì ta sẽ thêm đoạn code bên dưới hàm useEffect sẽ không được chạy và hàm localStorage sẽ giữ nguyên trạng thái như lúc ban đầu chúng ta đã thêm
        // => Nó sẽ không set lại todos mà chúng ta đã lưu trong localStorage do todos sắp bị thay đổi thành mảng rỗng

        // if (todos.length === 0) {
        //     return;
        // }
        //localStorage.setItem('todos', JSON.stringify(todos)) // hàm này sẽ không được chạy nếu ta update todos là một mảng rỗng

    }, [todos])

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, [])

    return (
        <div className="text-center bg-[#1A1A40] mt-[5rem] p-[2rem] rounded-[5px]">
            <h1 className="text-[#fff] mb-[0.5rem] text-[1.75rem]">Get Things Done!</h1>
            <h1 className="text-[#fff] mb-[0.5rem] text-[1.75rem]">{numberConplete}/{numberTotal} Complete</h1>
            <h2 className="text-[#fff] mb-[0.5rem] text-[1.25rem]">{getMessage()}</h2>
            <TodoBeginnerForm addTodo={addTodo} />
            {todos.map((todo, index) => {
                return (
                    todo.isEditing ? (
                        <EditTodoBeginnerForm editTask={editTask} todo={todo} />
                    ) : (
                        <TodoBeginner todo={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                    )
                )
            })}
        </div>
    )
};

export default TodoBeginnerWrappper;