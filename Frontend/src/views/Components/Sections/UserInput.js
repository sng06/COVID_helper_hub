import React, { Component } from 'react';
import CustomInput from "components/CustomInput/CustomInput.js";

class UserInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            input: null
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const data = this.state
        console.log("Final data is", data)
    }

    handleInputChange = (event) => {
        console.log(event)
        console.log(event.target.name)
        console.log(event.target.value)
         this.setState({
            //  [event.target.name]: event.target.value
            input: event.target.value
         })
    }

    // componentDidMount() {
    //     this.setState({
    //         input: ""
    //     })
    // }

    render() {
        const {input} = this.state
        return (
            <div>
                <h3>try typing something</h3>
                <h4> Input is: {input}</h4>
                <form action="" onSubmit={this.handleSubmit} onChange={this.handleInputChange}>
                    <CustomInput
                        labelText="type something here :)"
                        id="float"
                        formControlProps={{
                        fullWidth: true
                        }}
                    />
                </form> 
                
            </div>       
        )
    }
}

export default UserInput