// Tutorial -16 - Column Hiding
// B1 : Thêm allColumns , getToggleHideAllColumnsProps bên dưới prepareRow
// B2 : Thêm 1 thẻ div trên thẻ table
// B3 : import CheckboxTable from "./CheckboxTable"
// B4 : Thêm <CheckboxTable /> vào trong đó

import React, { useMemo } from "react";
import { useTable } from "react-table";
import MOCK_DATA from '../components/MOCK_DATA.json';
import { COLUMNS, GROUPED_COLUMS } from '../components/columns.js';

import CheckboxTable from "./CheckboxTable.jsx";

import { FaEdit, FaTrash } from 'react-icons/fa';


const ColumnHiding = () => {
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

    const tableInstance = useTable({
        columns,
        data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow, // <-- This is the important part
        allColumns,
        getToggleHideAllColumnsProps
    } = tableInstance

    const handleEdit = (id) => {
        // Implement your edit logic here
        alert(`Edit action for id: ${id}`);
    };

    const handleDelete = (id) => {
        // Implement your delete logic here
        alert(`Delete action for id: ${id}`);
    };

    return (
        <>
            <div>
                <div>
                    <CheckboxTable {...getToggleHideAllColumnsProps()} /> Toggle All
                </div>
                {
                    allColumns.map((column) => {
                        return (
                            <div key={column.id}>
                                <lable>
                                    <input type="checkbox" {...column.getToggleHiddenProps()} />
                                    {
                                        column.Header
                                    }
                                </lable>
                            </div>
                        )
                    })
                }
            </div>
            <table {...getTableProps()} className="border border-gray-700 w-full text-left">
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
                        rows.map((row, i) => {
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
                <tfoot>
                    {
                        footerGroups.map((footerGroup) => (
                            <tr {...footerGroup.getFooterGroupProps()}>
                                {
                                    footerGroup.headers.map((column) => (
                                        <td {...column.getFooterProps}>
                                            {
                                                column.render('Footer')
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tfoot>
            </table>
        </>
    )
};

export default ColumnHiding;