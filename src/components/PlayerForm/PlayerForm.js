import React, { Component } from 'react';
import './PlayerForm.css';

class PlayerForm extends Component {
    state = {
        value: ''
    };

    handleChange = (event) => {
        this.setState({value: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let playerName = event.target[0].value;

        if(playerName){
            this.props.onSubmit(playerName)
            this.setState({value: ''})
        }
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit} id="add">
                <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Add new player" maxLength="30" />
            </form>
        )
    }
}

export default PlayerForm;
