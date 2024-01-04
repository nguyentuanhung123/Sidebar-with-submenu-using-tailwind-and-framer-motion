import React, { useState } from "react";

const EditTodoBeginnerForm = ({ editTask, todo }) => {

    const [value, setValue] = useState(todo.task);

    const handleSubmit = (e) => {
        e.preventDefault();

        editTask(value, todo.id);

        setValue("");
    }


    return (
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input type="text" className="todo-input" value={value} placeholder="Update Task" onChange={(e) => setValue(e.target.value)} />
            <button type="submit" className="todo-btn">Update Task</button>
        </form>
    )
};

export default EditTodoBeginnerForm;