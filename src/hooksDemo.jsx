import React, { useState } from 'react'
import DataComponent from './context/data'
import MainComponent from './context/main' 
const HoooksDemo = () => {
    const [cntr, setCntr] = useState(new Date().toLocaleTimeString())
    const inc = () => {
        setCntr(new Date().toLocaleTimeString())
    }
    setInterval(inc, 1000)
    return (
        <>
            <span>{cntr}</span>
        </>
    );
}

export default HoooksDemo;