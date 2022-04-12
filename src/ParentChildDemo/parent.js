import React from 'react'
import Child from './child'

class Parent extends React.Component {
    state = {
        name : ""
    }
    handelCallBack = (child) => {
        this.setState({ name: child })
    }
    render() {
        const { name } = this.state;
        return(<>
            <Child parentCallback={this.handelCallBack} />
            {name}
        </>)
    }
}
export default Parent