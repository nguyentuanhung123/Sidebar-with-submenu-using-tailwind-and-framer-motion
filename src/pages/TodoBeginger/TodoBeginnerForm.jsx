import React, { useState } from "react";

const TodoBeginnerForm = ({ addTodo }) => {

    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        addTodo(value);

        setValue("");
    }


    return (
        <form className="w-full mb-[1rem]" onSubmit={handleSubmit}>
            <input type="text" className="bg-transparent focus:outline-none px-[1rem] py-[0.5rem] border border-solid border-[#8758ff] mt-[1rem] mb-[2rem] w-[300px] text-[#fff] placeholder-[#ffffff4d]" value={value} placeholder="What is the task today" onChange={(e) => setValue(e.target.value)} />
            <button type="submit" className="bg-[#8758ff] text-[#fff] border-none p-[0.55rem] cursor-pointer">Add Task</button>
        </form>
    )
};

export default TodoBeginnerForm;