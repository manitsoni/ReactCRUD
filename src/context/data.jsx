import React, { useContext } from 'react'
import { Firstname } from '../App'

const DataComponent = () => {
    const value = useContext(Firstname)
    return (
        <>
            {value}
            {/* <Firstname.Consumer>
                {(fname) => {
                    console.log(fname)
                    return (
                        <h1>My name is {fname}</h1>
                    )
                }};
            </Firstname.Consumer> */}
        </>
    )
}
export default DataComponent;