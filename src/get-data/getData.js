import React, { useEffect, useState, createContext } from "react";
import "./getData.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grow from '@mui/material/Grow';
import HoooksDemo from "../hooksDemo";
import { useNavigate } from "react-router-dom"
import TableSortLabel from '@mui/material/TableSortLabel';
import Avatar from '@mui/material/Avatar';
import { DataGrid } from '@mui/x-data-grid';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SetEid = createContext();
function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.charAt(0).toUpperCase()}${name.charAt(1).toUpperCase()}`,
    };
}
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
const headCells = [
    {
        id: 'name',
        numeric: false,
        label: 'Name',
    },
    {
        id: 'phone',
        numeric: true,
        label: 'Phone',
    },
    {
        id: 'website',
        numeric: false,
        label: 'Website',
    },
    {
        id: 'age',
        numeric: false,
        label: 'Age',
    }
];
function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        console.log(event);
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow variant="head">
                <TableCell > <b>#</b></TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'desc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            <b>{headCell.label}</b>
                            {orderBy === headCell.id ? (
                                <Box component="span" >
                                    {/* {order === 'desc' ? 'd' : 'a'} */}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell > <b>Action</b></TableCell>

            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
function GetInfo() {
    const [msg, setMessage] = useState('');
    const [open, setOpen] = React.useState(false);
    let [cloneUser, setCloneUsers] = useState([]);
    let [users, setUsers] = useState([]);
    const [editId, setEditId] = useState('')
    const navigate = useNavigate();
    const [order, setOrder] = React.useState('asc');
    const [isUsers, setDataStatus] = React.useState(false);
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    };
    useEffect(() => {
        getList()
    }, [])
    const handleClose = (event, reason) => {
        console.log(reason)
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const columns = [
        { field: 'name', headerName: 'Name', width: 90 },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 150,
            editable: true,
        },
        {
            field: 'website',
            headerName: 'Website',
            width: 150,
            editable: true,
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 50,
            editable: true,
        }
    ];
    const getList = async () => {
        axios.get('https://624a7536fd7e30c51c0df056.mockapi.io/users', { headers: { "Access-Control-Allow-Origin": "*" } }
        ).then(response => {
            console.log(response)
            setUsers(response.data)
            setCloneUsers(response.data)
            setDataStatus(true)
            //setOpen(false);
        })
            .catch(error => {
                console.log(error)
                setOpen(true);
                setMessage("Connection error")
                setDataStatus(true)
            })
    }
    const searchUser = (event) => {
        if (event.target.value) {
            users = users.filter(x => x.name.toLowerCase().includes(event.target.value.toLowerCase()) || x.phone.toLowerCase().includes(event.target.value.toLowerCase()) || x.website.toLowerCase().includes(event.target.value.toLowerCase()));
            setUsers(users);
        } else {
            setUsers(cloneUser);
        }
    }
    const onDelete = (id) => {
        axios.delete(`https://624a7536fd7e30c51c0df056.mockapi.io/users/${id}`, {
        }, { headers: headers }).then(response => {
            console.log(response)
            getList();
            setOpen(true);
            setMessage('Delete data success')
        });
    }
    const addUser = () => {
        navigate('/add')
    }
    const setData = (id) => {
        const data = cloneUser.filter(x => x.id === id)[0]
        setEditId('116');
        navigate(`/edit/table/${data.id}`);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = users.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    return (<>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {msg}
            </Alert>
        </Snackbar>
        {isUsers === false ? (
            <Box sx={{ width: 500, marginLeft: '48%', marginTop: '5%' }} >
                <CircularProgress />
            </Box>
        ) : (

                <Grow in="true">

                    <Container>

                        <h1>Users list : <HoooksDemo /></h1>
                        <TextField size="small" id="outlined-basic" onChange={searchUser} placeholder="Search here" variant="outlined" style={{ bottom: '15px', width: '300px' }} />
                        <Button variant="contained" size="large" onClick={addUser} style={{ bottom: '15px', left: '778px' }}>Add</Button>
                        <br></br>

                        <TableContainer component={Paper} sx={{ width: '100%' }}>
                            <Table>
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={users.length}
                                />
                                <TableBody>
                                    {stableSort(users, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            return (
                                                <TableRow hover >
                                                    <TableCell align="left">  <Avatar {...stringAvatar(`${row.name}`)} /></TableCell>

                                                    <TableCell align="left">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="left">{row.phone}</TableCell>
                                                    <TableCell align="left">{row.website}</TableCell>
                                                    <TableCell align="left">{row.age}</TableCell>
                                                    <TableCell align="left"><Button variant="outlined" onClick={() => setData(row.id)}>Edit</Button>  <Button variant="outlined" color="error" onClick={() => onDelete(row.id)}>Delete</Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}

                                </TableBody>


                            </Table>
                        </TableContainer>
                        {users.length >= 5 ? <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /> : <>

                            </>}

                    </Container>
                </Grow>

            )}
    </>);
}

export default GetInfo;
export { SetEid };