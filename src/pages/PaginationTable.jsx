// Tutorail - 11 - Pagination (Next and Previous)
// B1 : import {usePagination} from "react-table";
// B2 : Bổ sung usePagination ngay bên cạnh { columns, data }
// B3 : Thay rows trong tableInstance thành page
// B4 : trong thẻ tbody đổi rows.map -> page.map => Browser sẽ chỉ hiện thị 10 dòng
// B5 : Bổ sung nextPage, previousPage ngay dưới page trong tableInstance
// B6 : Tạo 1 thẻ div chứa 2 button là Previous và Next cùng cấp với thẻ table với event là onClick => Tạo thành công 2 button với chức năng chuyển trang
// B7 : Bổ sung canNextPage, canPreviousPage ngay dưới previousPage
// B8 : Bổ sung trong 2 thẻ button disabled = {!canPreviousPage} và disabled = {!canNextPage} => Khi ở trang đầu không thể bấm Previous và ở trang cuối không thể bấm Next
// B9 : Bổ sung pageOptions, state ngay dưới canPreviousPage
// B10 : Bổ sung const { pageIndex } = state
// B11 : Bổ sung thẻ span cùng cấp với 2 button và ghi content trong đó

// Tutorail - 12 -  Pagination (Goto Page)
// B1 : Bổ sung gotoPage, pageCount ngay dưới pageOptions
// B2 : Bổ sung 2 button {'<<'} và {'>>'} để có thể đi tới đầu hoặc cuối danh sách
// B3 : Bổ sung 1 thẻ span để Go to page
// B4 : Bổ sung initialSate: { pageIndex : 0} ngay dưới data trong tableInstance

// Tutorail - 13 - Pagination (Page size)
// B1 : Bổ sung setPageSize ngay dưới pageCount
// B2 : const { pageIndex, pageSize } = state
// B3 : Bố sung thẻ <select value={pageSize}></select> dưới thẻ span Go to page


import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import MOCK_DATA from '../components/MOCK_DATA.json';
import { COLUMNS, GROUPED_COLUMS } from '../components/columns.js';

import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button } from "@material-tailwind/react";


const PaginationTable = () => {
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
            data,
            initialState: { pageIndex: 0 }
        },
        usePagination
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        prepareRow // <-- This is the important part
    } = tableInstance

    const { pageIndex, pageSize } = state

    const handleEdit = (id) => {
        // Implement your edit logic here
        alert(`Edit action for id: ${id}`);
    };

    const handleDelete = (id) => {
        // Implement your delete logic here
        alert(`Delete action for id: ${id}`);
    };

    // console.log('State : ', state); => {pageSize : 10, pageIndex: 0 , ....}

    // console.log("Page options : ", pageOptions); => 24

    // console.log("Page count : ", pageCount); => 25

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
                        page.map((row, i) => {
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
            <div className="flex items-center justify-center gap-[15px] mt-[20px]">
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page: {' '}
                    <input type="number" defaultValue={pageIndex + 1} className="w-[50px]"
                        onChange={(e) => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }} />
                </span>
                <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                    {
                        [5, 10, 15].map((pageSize) => {
                            return (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            )
                        })
                    }
                </select>
                <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</Button>
                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
                <Button onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
                <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</Button>
            </div>
        </>
    )
};

export default PaginationTable;