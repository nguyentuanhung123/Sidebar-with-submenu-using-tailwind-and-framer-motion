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
            <input
                type="text"
                className="outline-none bg-none border border-solid border-[#8758ff] py-[0.5rem] px-[1rem] mt-[1rem] mb-[2rem] w-[300px] text-[#000] placeholder-[#ccc]"
                value={value}
                placeholder="Update Task"
                onChange={(e) => setValue(e.target.value)} />
            <button
                type="submit"
                className="bg-[#8758ff] text-[#fff] border-none p-[0.55rem] cursor-pointer">
                Update Task
            </button>
        </form>
    )
};

export default EditTodoBeginnerForm;