// @material-ui/core components
import Button from "components/CustomButtons/Button.js";
import React, {Component} from 'react';
import axios from "axios";

class Quote extends Component {
    constructor() {
        super();
        this.state = {
            quote: "a random quote"
        };
    }
    
    updateQuote = () => {
        axios.get('getRandomQuote').then(resp => {
            this.setState({
                quote: resp.data.quote
            });
        });
    };
    
    render() {
        return (
            <div>
                <small>{this.state.quote}</small>
                <br/>
                <br/>
                <Button onClick = {this.updateQuote} color='info'>click me</Button>
                
            </div>

        );        
    }
}

export default Quote