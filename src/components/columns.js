import { format } from 'date-fns';
//import ColumnFilter from '../pages/ColumnFilter.jsx';

export const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id',
        disableFilters: true,
        sticky: 'left'
    },
    {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
        sticky: 'left'
    },
    {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
        sticky: 'left'
    },
    {
        Header: 'Email',
        Footer: 'Email',
        accessor: 'email',
        sticky: 'left'
    },
    {
        Header: 'Gender',
        Footer: 'Gender',
        accessor: 'gender'
    },
    {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth',
        Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyy') }
    },
    {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country'
    },
    {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone'
    },
]

export const GROUPED_COLUMS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id'
    },
    {
        Header: 'Name',
        Footer: 'Name',
        columns: [
            {
                Header: 'First Name',
                Footer: 'First Name',
                accessor: 'first_name'
            },
            {
                Header: 'Last Name',
                Footer: 'Last Name',
                accessor: 'last_name'
            }
        ]
    },
    {
        Header: 'Info',
        Footer: 'Info',
        columns: [
            {
                Header: 'Email',
                Footer: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Gender',
                Footer: 'Gender',
                accessor: 'gender'
            },
            {
                Header: 'Date of Birth',
                Footer: 'Date of Birth',
                accessor: 'date_of_birth'
            },
            {
                Header: 'Country',
                Footer: 'Country',
                accessor: 'country'
            },
            {
                Header: 'Phone',
                Footer: 'Phone',
                accessor: 'phone'
            },
        ]
    },
]