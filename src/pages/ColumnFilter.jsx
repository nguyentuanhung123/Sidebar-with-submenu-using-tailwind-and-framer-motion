import React from "react";

const ColumnFilter = ({ column }) => {

    const { filterValue, setFilter } = column;

    return (
        <span className="flex gap-[8px]">
            Search: {' '}
            <input className="text-[#000] flex-1" value={filterValue || ''}
                onChange={(e) => setFilter(e.target.value)} />
        </span>
    )
};

export default ColumnFilter;

