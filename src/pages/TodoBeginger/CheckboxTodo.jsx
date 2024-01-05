import React, { useState } from "react";
import { FaSquare } from "react-icons/fa";
import { FaSquareCheck } from "react-icons/fa6";

const CheckboxTodo = ({ checked, onClick }) => {

    return (
        <div className="flex items-center gap-[4px]" onClick={onClick}>
            {
                !checked && (
                    <div className="checkbox unchecked">
                        <FaSquare className="h-[20px] fill-[#61dafb]" />
                    </div>
                )
            }
            {
                checked && (
                    <div className="checkbox checked">
                        <FaSquareCheck className="h-[20px] fill-[#61dafb]" />
                    </div>
                )
            }
        </div>
    )
};

export default CheckboxTodo;