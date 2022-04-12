import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import { Link } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Container from '@mui/material/Container';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const DataGridDemo = () => {
    let [users, setUsers] = useState([]);
    let [loader, setLoader] = useState([]);
    const [msg, setMessage] = useState('');
    const [open, setOpen] = React.useState(false);
    const [pageSize, setPageSize] = React.useState(5);
    const navigate = useNavigate();
    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    };
    useEffect(() => {
        setLoader(true)
        getList()
    }, [])
    const columns = [
        { field: "name", headerName: "Name", width: 290 },
        {
            field: "phone",
            headerName: "Phone",
            width: 250,
            editable: true,
        },
        {
            field: "website",
            headerName: "Website",
            width: 150,
            editable: true,
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            width: 110,
            editable: true,
        },
        {
            field: "Action",
            sortable: false,
            width: 150,
            renderCell: (params) => {
                const onEdit = (e) => {
                    e.stopPropagation();
                    navigate(`/edit/grid/${params.id}`);
                }
                const onDelete = (e) => {
                    axios.delete(`https://624a7536fd7e30c51c0df056.mockapi.io/users/${params.id}`, {
                    }, { headers: headers }).then(response => {
                        getList();
                        setOpen(true);
                        setMessage('Delete data success')
                    });
                }
                return (<><Button variant="outlined" onClick={onEdit}>Edit</Button> &nbsp; <Button variant="outlined" color="error" onClick={onDelete}>Delete</Button></>)
            }
        },
    ];
    const getList = async () => {
        axios
            .get("https://624a7536fd7e30c51c0df056.mockapi.io/users", {
                headers: { "Access-Control-Allow-Origin": "*" },
            })
            .then((response) => {
                setUsers(response.data);
                setLoader(false)
                //setOpen(false);
            })
            .catch((error) => {
                setLoader(false)
                console.log(error);
            });
    };
    const handleClose = (event, reason) => {
        console.log(reason)
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
            <Container>
                <h1>Users list : Data grid demo</h1>

                <div
                    style={{
                        height: 371,
                        width: "100%",
                        marginLeft: "5%",
                        marginTop: "5%",
                        marginBottom: "10%",
                    }}
                >
                    <DataGrid
                        rows={users}
                        columns={columns}
                        pageSize={pageSize}
                        rowsPerPageOptions={[10, 15, 25, 50, 100]}
                        loading={loader}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        pagination
                        {...users}
                        hideFooterSelectedRowCount={true}
                        showCellRightBorder={true}
                        showColumnRightBorder={true}
                    />
                </div>
            </Container>
        </>
    );
};
export default DataGridDemo