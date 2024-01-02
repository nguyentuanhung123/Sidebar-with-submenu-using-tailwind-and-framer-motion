
//React-Table-Tutorial - 6 - Sorting
// B1 : import useSortBy
// B2 : Add useSortBy vào tableInstance
// B3 : Add column.getSortByToggleProps() trong thẻ 

//React-Table-Tutorial - 7 - Sorting and Formatting
// B1 : npm i date-fns
// B2 : Vào column.js và import {format} from 'date-fns
// B3 : Di tới phần Date of Birth và Bổ sung bên dưới accessor là Cell : ({value}) => {return format(new Date(value), 'dd/MM/yyy')}

import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import MOCK_DATA from '../components/MOCK_DATA.json';
import { COLUMNS, GROUPED_COLUMS } from '../components/columns.js';
import '../components/table.css'

import logoUp from '../images/emoji_u1f53c.png';
import logoDown from '../images/emoji_u1f53d.png'

const SortingTable = () => {
    // đoạn code chỉ thực hiện 1 lần duy nhất khi components được mount, nó sẽ không thực thi lại khi components bị re-render lại

    // const columns = useMemo(() => GROUPED_COLUMS, [])

    const columns = useMemo(() => COLUMNS, [])

    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useSortBy
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = tableInstance

    // const {}

    return (
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {
                                            column.render('Header')
                                        }
                                        <span>
                                            {
                                                column.isSorted ? (column.isSortedDesc ? <img src={logoDown} className="w-[18px] h-[18px] inline-block ml-[8px]" /> : <img src={logoUp} className="w-[18px] h-[18px] inline-block ml-[8px]" />) : ''
                                            }
                                        </span>
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
                                    <td {...column.getFooterProps()}>
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
    )
};

export default SortingTable;