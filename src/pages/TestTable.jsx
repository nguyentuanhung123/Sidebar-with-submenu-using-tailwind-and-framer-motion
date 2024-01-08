
// B1 : vào link https://mockaroo.com/
// B2 : Chỉnh sửa api theo ý mình
// B3 : npm i react-table
import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
//import MOCK_DATA from '../components/MOCK_DATA.json';
import { COLUMNS, GROUPED_COLUMS } from '../components/columns.js';
//import '../components/table.css'
import axios from "axios";
import Loading from "./Loading.jsx";

import { FaEdit, FaTrash } from 'react-icons/fa';
import DeleteConfirmationModal from "./DeleteConfirmationModal.jsx";



const TestTable = () => {
    // đoạn code chỉ thực hiện 1 lần duy nhất khi components được mount, nó sẽ không thực thi lại khi components bị re-render lại

    // const columns = useMemo(() => GROUPED_COLUMS, [])

    const [employee, setEmployee] = useState([]);

    const [loading, setLoading] = useState(true); // Added loading state

    const [popupDelete, setPopupDelete] = useState({
        show: false, // initial values set to false and null
        id: null,
    });


    const loadData = async () => {
        try {
            // Fetch data using Axios
            const response = await axios.get("http://localhost:3006/employees");
            setEmployee(response.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            // Set isLoading to false after fetching data (whether successful or not)
            setLoading(false);
        }
    };



    useEffect(() => {
        setTimeout(() => {
            loadData();
        }, 3000)
    }, []); // Empty dependency array to run the effect only once on component mount

    const columns = useMemo(() =>
        [
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
                        {/* <button onClick={() => handleDelete(row.original.id)}>
                            <FaTrash />
                        </button> */}
                        <button onClick={() => openDeleteModel(row.original.id)}>
                            <FaTrash />
                        </button>
                    </div>
                ),
            },
        ],
        []
    )


    const tableInstance = useTable({
        columns,
        data: employee // Corrected: data should be under the 'data' property
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = tableInstance

    const handleEdit = (id) => {
        // Implement your edit logic here
        alert(`Edit action for id: ${id} , `);
        // console.log("Employee : ", employee[id]);
    };

    //Logic Popup delete

    const closeDeleteModal = () => {
        setPopupDelete({
            show: false,
            id: null,
        });
    };

    const openDeleteModel = (id) => {
        setPopupDelete({
            show: true,
            id: id,
        });
    }

    const handleDelete = async () => {
        try {
            if (popupDelete.show && popupDelete.id) {

                // Make a DELETE request to the server's endpoint for deleting an employee
                await axios.delete(`http://localhost:3006/employees/${popupDelete.id}`);

                // If the request is successful, you can update your UI or state
                alert(`Successfully deleted employee with id: ${popupDelete.id}`);

                // Reload the data after deletion
                loadData();

                // Close the delete confirmation modal
                closeDeleteModal();
            }
        } catch (error) {
            console.error(`Error deleting employee with id ${popupDelete.id}: `, error);
        }
    }

    // const handleDelete = async (id) => {
    //     try {
    //         // Ask for confirmation
    //         const confirmDelete = window.confirm("Are you sure you want to delete this item?");

    //         //console.log('confirmDelete : ', confirmDelete);

    //         if (!confirmDelete) {
    //             // User clicked Cancel in the confirmation dialog
    //             return;
    //         }

    //         // Make a DELETE request to the server's endpoint for deleting an employee
    //         await axios.delete(`http://localhost:3006/employees/${id}`);

    //         // If the request is successful, you can update your UI or state
    //         alert(`Successfully deleted employee with id: ${id}`);

    //         // Reload the window to reflect changes
    //         window.location.reload();
    //     } catch (error) {
    //         // Handle any errors that occur during the delete request
    //         console.error(`Error deleting employee with id ${id}:`, error);
    //     }
    // };

    return (
        <>
            <table {...getTableProps()} className="border border-gray-700 w-full text-left">
                <thead className="bg-indigo-600">
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                                {
                                    headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()} key={column.id} className="capitalize px-3.5 py-2">
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
                    {loading ? (
                        <Loading /> // Show loading indicator when loading is true
                    ) : (
                        rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={row.id} className={`${i % 2 === 0 ? 'bg-red-900' : 'bg-yellow-800'}`}>
                                    {row.cells.map((cell, columnIndex) => (
                                        <td {...cell.getCellProps()} key={columnIndex} className="px-3.5 py-2">
                                            {
                                                cell.render('Cell')
                                            }
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    )}
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
            {/* Other components */}
            {
                popupDelete.show && <DeleteConfirmationModal
                    onCancel={closeDeleteModal}
                    onConfirm={handleDelete}
                />
            }
        </>
    )
};

export default TestTable;