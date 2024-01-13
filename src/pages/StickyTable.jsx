// Tutorial - 17 - Sticky-table
// B1 : npm i react-table-sticky
// B2 : npm i styled-components
// B3 : Tạo thêm 1 file là TableStyles.jsx
// B4 : import { useBlockLayout } from "react-table";
// B5 : import { useSticky } from 'react-table-sticky
// B6 : Thêm useBlockLayout , useSticky bên dưới {columns, data }
// B7 : import { Styles } from './TableStyles'
// B8 : Đặt thẻ table trong thẻ Styles
// B9 : Xoá Footer nếu có
// B10 : const firstPageRows = rows.slice(0,20)
// B11 : Thay rows bằng firstPageRows trong table
// B12 : vào column.js , bổ sung sticky: 'left' bên dưới accessor

import React, { useMemo } from "react";

import { useTable, useBlockLayout } from "react-table";
import { useSticky } from 'react-table-sticky';

import { Styles } from './TableStyles.jsx'

import MOCK_DATA from '../components/MOCK_DATA.json';
import { COLUMNS, GROUPED_COLUMS } from '../components/columns.js';

import { FaEdit, FaTrash } from 'react-icons/fa';


const StickyTable = () => {
    // đoạn code chỉ thực hiện 1 lần duy nhất khi components được mount, nó sẽ không thực thi lại khi components bị re-render lại

    // const columns = useMemo(() => GROUPED_COLUMS, [])

    const columns = useMemo(() => [
        ...COLUMNS, // Your existing columns
        {
            Header: 'Action',
            Footer: 'Action',
            accessor: 'actions', // Use a different accessor for the Action column
            Cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button onClick={() => handleEdit(row.original.id)}>
                        <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(row.original.id)}>
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ], []);

    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable(
        {
            columns,
            data
        },
        useBlockLayout,
        useSticky
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow // <-- This is the important part
    } = tableInstance

    const firstPageRows = rows.slice(0, 20);

    const handleEdit = (id) => {
        // Implement your edit logic here
        alert(`Edit action for id: ${id}`);
    };

    const handleDelete = (id) => {
        // Implement your delete logic here
        alert(`Delete action for id: ${id}`);
    };

    return (
        <Styles>
            <table {...getTableProps()} className="border border-gray-700 w-[500px] h-[500px] text-left table sticky">
                <thead className="bg-indigo-600">
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()} className="capitalize px-3.5 py-2">
                                            {
                                                column.render('Header')
                                            }
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        firstPageRows.map((row, i) => {
                            prepareRow(row); // <-- This prepares the row for rendering
                            return (
                                <tr {...row.getRowProps()} className={`${i % 2 === 0 ? 'bg-red-900' : 'bg-yellow-800'} hover:bg-[#ccc]`}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()} className="px-3.5 py-2">
                                            {cell.column.id === 'action' ? cell.render('Cell') : cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </Styles>
    )
};

export default StickyTable;