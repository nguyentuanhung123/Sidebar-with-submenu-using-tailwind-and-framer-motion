// Tutorial - 8
// B1 : Tạo file GlobalFilter.jsx
// B2 : import {useGlobalFilter} from "react-table";
// B3 : Bổ sung useGlobalFilter trong tableInstance
// B4 : Bố sung state, setGlobalFilter ở bên dưới 
// B5 : Bố sung bên dưới const {globalFilter} = state


// Tutorial - 9
// B1 : Tạo file ColumnFilter.jsx và chỉnh sửa
// B2 : import {useFilters} from "react-table";
// B3 : Bổ sung useFilters trong tableInstance
// B4 : Bổ sung trong thẻ th :  <div>{column.canFilter ? column.render('Filter') : null}</div>
// B5 : Vào file column.js :  import ColumnFilter from '../pages/ColumnFilter';
// B5 : Sửa lại file column.js trong hàm COLUMNS bằng cahs thêm Filter: ColumnFilter ngay duói accessor


import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import MOCK_DATA from '../components/MOCK_DATA.json';
import { COLUMNS, GROUPED_COLUMS } from '../components/columns.js';
import '../components/table.css'
import GlobalFilter from "./GlobalFilter.jsx";

const FilteringTable = () => {
    // đoạn code chỉ thực hiện 1 lần duy nhất khi components được mount, nó sẽ không thực thi lại khi components bị re-render lại

    // const columns = useMemo(() => GROUPED_COLUMS, [])

    const columns = useMemo(() => COLUMNS, [])

    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable(
        {
            columns,
            data
        },
        useFilters,
        useGlobalFilter
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = tableInstance



    const { globalFilter } = state

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()}>
                                            {
                                                column.render('Header')
                                            }
                                            <div>{column.canFilter ? column.render('Filter') : null}</div>
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        })
                                    }
                                </tr>
                            )
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

export default FilteringTable;