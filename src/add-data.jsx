import React, { useState, useEffect, useContext } from "react";
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
import HoooksDemo from "./hooksDemo";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grow from '@mui/material/Grow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate, useParams } from "react-router-dom"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useForm } from "react-hook-form";
import { SetEid } from "./get-data/getData";
import { Firstname } from "./App";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddUser = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const { mode, uid } = useParams();
    //const uid = useContext(Firstname);
    //console.log(uid)
    const [Action, setAction] = useState('Add')
    const [msg, setMessage] = useState('');
    const [open, setOpen] = React.useState(false);
    const [id, setId] = useState('');
    const [name, setFirstName] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [isGet, setDataGettingStatus] = useState([]);
    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    };
    useEffect(() => {
        if (uid) {
            getList();
            setDataGettingStatus(false)
        } else {
            setId('');
            setFirstName('');
            setPhone('');
            setWebsite('');
            setAge('');
            setAction('Add')
        }
    }, [])
    const getList = async () => {
        axios.get(`https://624a7536fd7e30c51c0df056.mockapi.io/users/${uid}`, { headers: { "Access-Control-Allow-Origin": "*" } }
        ).then(response => {
            setDataGettingStatus(true)
            setData(response.data);
        })
            .catch(err => {
                setMessage("No data found")
                cancel();
            })
    }
    const navigate = useNavigate()
    // const searchUser = (event) => {
    //     if (event.target.value) {
    //         users = users.filter(x => x.name.toLowerCase().includes(event.target.value.toLowerCase()) || x.phone.toLowerCase().includes(event.target.value.toLowerCase()) || x.website.toLowerCase().includes(event.target.value.toLowerCase()));
    //         setUsers(users);
    //     } else {
    //         setUsers(cloneUser);
    //     }
    // }
    const saveUser = (data) => {
        setData(data)
        if (id === '') {
            if (data) {
                axios.post('https://624a7536fd7e30c51c0df056.mockapi.io/users', {
                    name,
                    phone,
                    website,
                    age
                }, { headers: headers }).then(response => {
                    // getList();
                    // cancel();
                    setOpen(true);
                    setMessage('Insert data success')
                });
            }
        } else {
            if (data) {
                axios.put(`https://624a7536fd7e30c51c0df056.mockapi.io/users/${id}`, {
                    name,
                    phone,
                    website,
                    age
                }, { headers: headers }).then(response => {
                    //getList();
                    //cancel()
                    setOpen(true);
                    setMessage('Update data success')
                });
            }
        }
    }

    const setData = (data) => {
        setId(data.id);
        setFirstName(data.name);
        setPhone(data.phone);
        setWebsite(data.website);
        setAge(data.add);
        setAction('Modify');
    }
    const cancel = () => {
        setId('');
        setFirstName('');
        setPhone('');
        setWebsite('');
        setAge('');
        setAction('Add');
        mode === 'table' ? navigate("/") : navigate("/grid")
    }
    // const onDelete = (id) => {
    //     axios.delete(`https://624a7536fd7e30c51c0df056.mockapi.io/users/${id}`, {
    //     }, { headers: headers }).then(response => {
    //         console.log(response)
    //         getList();
    //         setOpen(true);
    //         setMessage('Delete data success')
    //     });
    // }
    const handleClose = (event, reason) => {
        setOpen(false);
        cancel();
    };
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <>
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
            {uid > 0 && isGet == false ? (
                <Box sx={{ width: 500, marginLeft: '48%', marginTop: '5%' }} >
                    <CircularProgress />
                </Box>
            ) : (
                    <Grow in="true">
                        <Container>
                            <h1 > {Action} user </h1>
                            {/* <form onSubmit={handleSubmit(onSubmit)}>
                                <input {...register("firstName", { required: true })} />
                                {errors.firstName?.type === 'required' && "First name is required"}

                                <input {...register("lastName", { required: true })} />
                                {errors.lastName && "Last name is required"}

                                <input type="submit" />
                            </form> */}
                            <br></br>
                            <form onSubmit={handleSubmit(saveUser)} style={{ left: '50%' }}>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch', display: 'flex' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <FormControl style={{ bottom: '15px', }}>
                                        <TextField id="outlined-basic" size="small" {...register("name", { required: true })} onChange={(event) => setFirstName(event.target.value)} label="Add first name" value={name} name="name" variant="outlined" />
                                        <span style={{ color: 'red', fontSize: '14px', marginLeft: '8px' }}>{errors.name?.type === 'required' && "Name is required"}</span>
                                    </FormControl>
                                    <FormControl style={{ bottom: '15px', }}>
                                        <TextField id="outlined-basic" size="small"{...register("phone", { required: true })} onChange={(event) => setPhone(event.target.value)} label="Add phone number" value={phone} name="phone" variant="outlined" />
                                        <span style={{ color: 'red', fontSize: '14px', marginLeft: '8px' }}>{errors.phone?.type === 'required' && "Phone number is required"}</span>
                                    </FormControl>
                                    <FormControl style={{ bottom: '15px', width: '300px' }}>
                                        <TextField size="small" id="outlined-basic" {...register("website", { required: true })} onChange={(event) => setWebsite(event.target.value)} label="Add website" value={website} name="website" variant="outlined" />
                                        <span style={{ color: 'red', fontSize: '14px', marginLeft: '8px' }}>{errors.website?.type === 'required' && "Website is required"}</span>
                                    </FormControl>
                                    <br></br>
                            &nbsp;&nbsp;<Button variant="contained" size="medium" onClick={handleSubmit(saveUser)}>Save</Button>&nbsp;<Button size="medium" variant="contained" color="error" onClick={cancel}>Cancel</Button>
                                </Box>
                            </form>
                            {/* <h1>Users list : <HoooksDemo /></h1>
                            <TextField size="small" id="outlined-basic" onChange={searchUser} placeholder="Search here" variant="outlined" style={{ bottom: '15px', width: '300px' }} />
                            <br></br>
                            <TableContainer component={Paper} sx={{ width: '100%' }}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Name</TableCell>
                                            <TableCell align="left">Phone</TableCell>
                                            <TableCell align="left">Website</TableCell>
                                            <TableCell align="left">Age</TableCell>
                                            <TableCell align="left">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((row) => (
                                            <TableRow>
                                                <TableCell align="left">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="left">{row.phone}</TableCell>
                                                <TableCell align="left">{row.website}</TableCell>
                                                <TableCell align="left">{row.age}</TableCell>
                                                <TableCell align="left"><Button variant="outlined" onClick={() => setData(row.id)}>Edit</Button>  <Button variant="outlined" color="error" onClick={() => onDelete(row.id)}>Delete</Button>
                                                </TableCell>
                                            </TableRow>

                                        ))}

                                    </TableBody>

                                </Table>
                            </TableContainer> */}

                        </Container>
                    </Grow>
                )}
        </>
    );
};
export default AddUser