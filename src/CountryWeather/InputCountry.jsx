import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
const InputCountry = () => {
    const [countryName, setCountryName] = useState('')
    const navigate = useNavigate();
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>Country weather app</h2>
                <TextField id="outlined-basic" value={countryName} onChange={(e) => setCountryName(e.target.value)} label="Outlined" variant="outlined" />
                <br></br>
                <Button variant="contained" disabled={!countryName} onClick={() => {navigate(`/search/${countryName}`)}}>Search</Button>
            </div>
        </>
    );
}
export default InputCountry