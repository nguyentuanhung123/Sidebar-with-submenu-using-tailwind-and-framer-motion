
// B1 : vào link https://mockaroo.com/
// B2 : Chỉnh sửa api theo ý mình
// B3 : npm i react-table
import React, { useMemo } from "react";
import { useTable } from "react-table";
import MOCK_DATA from '../components/MOCK_DATA.json';
import { COLUMNS, GROUPED_COLUMS } from '../components/columns.js';
import '../components/table.css'

const ReactTable = () => {
    // đoạn code chỉ thực hiện 1 lần duy nhất khi components được mount, nó sẽ không thực thi lại khi components bị re-render lại

    // const columns = useMemo(() => GROUPED_COLUMS, [])

    const columns = useMemo(() => COLUMNS, [])

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
                                    <th {...column.getHeaderProps()}>
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
    )
};

export default ReactTable;