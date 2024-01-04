// Tutorial 10
// B1 : import {useState} from "react";
// B2 : import {useAsyncDebounce} from "react-table";
// B3 : Bổ sung const [value, setValue] = useState(filter);
// B4 : Bổ sung const onChange = useAsyncDebounce((value) => {setFilter(value || undefined)} , 3000)
// B5 : Thay trong thẻ input :  value={filter || ''} => value={value || ''}
// B6 : Thay trong thẻ input : onChange={(e) => setFilter(e.target.value)} => onChange={(e) => setValue(e.target.value) onChange(e.target.value)}

import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

const GlobalFilter = ({ filter, setFilter }) => {

    const [value, setValue] = useState(filter)

    const onChange = useAsyncDebounce((value) => {
        setFilter(value || undefined)
    }, 3000)

    return (
        <span>
            Search: {' '}
            <input value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value)
                    onChange(e.target.value)
                }} />
        </span>
    )
};

export default GlobalFilter;