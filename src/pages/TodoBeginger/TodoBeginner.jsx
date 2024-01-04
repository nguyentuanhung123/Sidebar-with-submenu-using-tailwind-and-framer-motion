import React from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';

const TodoBeginner = ({ task, toggleComplete, deleteTodo, editTodo }) => {
    return (
        <div className="Todo">
            <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
            <p onClick={() => toggleComplete(task.id)} className={`${task.completed ? 'completed' : ''}`}>{task.task}</p>
            <div className="flex gap-[12px]">
                <FaEdit onClick={() => editTodo(task.id)} />
                <FaTrash onClick={() => deleteTodo(task.id)} />
            </div>
        </div>
    )
};

export default TodoBeginner;