import React, { useState } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import CheckboxTodo from "./CheckboxTodo.jsx";

const TodoBeginner = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
    return (
        <div className={`flex justify-between items-center text-[#fff] px-[0.75rem] py-[1rem] rounded-[5px] mb-[1rem] cursor-pointer bg-[#8758ff]  ${todo.completed ? 'opacity-[0.3]' : null}`}>
            {/* <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} /> */}
            <CheckboxTodo checked={todo.completed} onClick={() =>
                toggleComplete(todo.id)} />
            <span onClick={() => toggleComplete(todo.id)}
                className={`${todo.completed ? 'opacity-[0.3] before:w-[100%]' : ''} relative 
            before:content-[''] before:block before:w-[0px] before:h-[1px] before:bg-[#ddd] 
            before:absolute before:top-[10px] before:duration-300`}>
                {todo.task}
            </span>
            <div className="flex gap-[12px]">
                <FaEdit onClick={() => editTodo(todo.id)} />
                <FaTrash onClick={() => deleteTodo(todo.id)} />
            </div>
        </div>
    )
};

export default TodoBeginner;