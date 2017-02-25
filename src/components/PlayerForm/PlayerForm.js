import React, { Component } from 'react';

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
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Add new player" />
            </form>
        )
    }
}

export default PlayerForm;
