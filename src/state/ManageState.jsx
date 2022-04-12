import React, { Component } from 'react'

class ManageState extends React.Component {
    constructor(props) {
        debugger
        super(props);
        this.state = {
            name: this.props.name,
            data: this.props.number
        }
    }
    render() {
        return (
            <h1>Hello ,{this.state.name} {this.state.data}</h1>
        )
    }
}
export default ManageState