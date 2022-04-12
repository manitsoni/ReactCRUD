import React from 'react'
import {useParams} from 'react-router-dom'
const CountryList = () => {
    const {name}= useParams()
    return (<h1>Please Find : {name} </h1>);
}
export default CountryList;