import React from 'react';

class Child extends React.Component {
    onTrigger = (event) => {
        this.props.parentCallback(event.target.fname.value);
        event.preventDefault();
    }
    render() {
        return (
            <>
                <div>
                    <form onSubmit={this.onTrigger}>
                        <input type="text" name="fname" placeholder="Enter name" />
                        <br></br><br></br>
                        <input type="submit" value="Submit" />
                        <br></br><br></br>
                    </form>
                </div>
            </>
        );
    }
}
export default Child