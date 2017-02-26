import React, { Component } from 'react';
import _ from 'lodash';
//import logo from './logo.svg';
import './App.css';
import Pitch from './components/Pitch/Pitch';
import PlayerChip from './components/PlayerChip/PlayerChip';
import PlayerForm from './components/PlayerForm/PlayerForm';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

class App extends Component {
    constructor(){
        super();
        let localState = localStorage.getItem('plunkrPickTeams');
        let players = [];
        if(localState){
            players = JSON.parse(localState);
        }

        this.state = {
            players: players
        }
    }

    componentDidUpdate(){
        localStorage.setItem('plunkrPickTeams', JSON.stringify(this.state.players));
    }

    addPlayer = (playerName) => {
        let teamA = this.state.players.filter(player => player.team === 0),
            teamB = this.state.players.filter(player => player.team === 1),
            teamId = teamA.length <= teamB.length ? 0 : 1;

        if(playerName && this.state.players.indexOf(playerName) === -1){
            this.setState({
                players: this.state.players.concat({name: playerName, team: teamId})
            })
        }
    }

    removePlayer = (event) => {
        let playerName = event.target.dataset.player;

        if(playerName){
            this.setState({
                players: this.state.players.filter((player) => player.name !== playerName)
            })
        }
    }

    randomise = () =>   {
        let teamValues = this.state.players.map(player => player.team);
        let randomisedTeamValues = _.shuffle(teamValues);

        this.setState({
            players: this.state.players.map((player, index) => {
                player.team = randomisedTeamValues[index];
                return player;
            })
        });
    }

    playersByTeam(teamId){
        return this.state.players.filter(player => player.team === teamId);
    }

    render(){
        return (
            <div>
                <PlayerForm onSubmit={this.addPlayer} />
                <Pitch>
                    <div className="players home">
                    {this.playersByTeam(0).map(player => {
                        return <PlayerChip key={player.name} player={player.name} onClick={this.removePlayer}/>
                    })}
                    </div>
                    <div className="players away">
                    {this.playersByTeam(1).map(player => {
                        return <PlayerChip key={player.name} player={player.name} onClick={this.removePlayer}/>
                    })}
                    </div>
                </Pitch>
                <button onClick={this.randomise} disabled={this.state.players.length < 2}>Randomise</button>
            </div>
        )
    }
}

export default App;
