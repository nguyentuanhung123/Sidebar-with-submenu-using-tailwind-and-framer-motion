// Tutorial 14 - Selecting Rows
// B1 : const firstPageRows = rows.slice(0, 10);
// B2 : Thay rows trong thẻ <tbody> là firstPageRows => 10 dòng ở browser
// B3 : Tạo 1 file CheckboxTable.jsx theo hướng dẫn;
// B4 : import {useRowSelect} from "react-table";
// B5 : Thêm useRowSelect sau { columns, data } trong useTable
// B6 : Thêm selectedFlatRows ngay dưới prepareRow
// B7 : Thêm một hàm ngay dưới useRowSelect vừa tạo


import React, { useMemo } from "react";
import { useTable, useRowSelect } from "react-table";
import MOCK_DATA from '../components/MOCK_DATA.json';
import { COLUMNS } from '../components/columns.js';

import { FaEdit, FaTrash } from 'react-icons/fa';
import CheckboxTable from "./CheckboxTable.jsx";

const RowSelection = () => {
    const columns = useMemo(() => [
        ...COLUMNS,
        {
            Header: 'Action',
            Footer: 'Action',
            accessor: 'actions',
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

    const data = useMemo(() => MOCK_DATA, []);

    const tableInstance = useTable(
        {
            columns,
            data
        },
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <CheckboxTable {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({ row }) => <CheckboxTable {...row.getToggleRowSelectedProps()} />
                },
                ...columns
            ])
        }
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        selectedFlatRows
    } = tableInstance;

    const firstPageRows = rows.slice(0, 10);

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
            <pre>
                <code>
                    {
                        JSON.stringify(
                            {
                                selectedFlatRows: selectedFlatRows.map((row) => row.original),
                            },
                            null,
                            2
                        )
                    }
                </code>
            </pre>
        </>
    );
};

export default RowSelection;