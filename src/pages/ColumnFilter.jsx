import React from "react";

const ColumnFilter = ({ column }) => {

    const { filterValue, setFilter } = column;

    return (
        <span>
            Search: {' '}
            <input className="text-[#000]" value={filterValue || ''}
                onChange={(e) => setFilter(e.target.value)} />
        </span>
    )
};

export default ColumnFilter;

