import React, { Component } from 'react';
import _ from 'lodash';
//import logo from './logo.svg';
import './App.css';
import Pitch from './components/Pitch/Pitch';
import PlayerChip from './components/PlayerChip/PlayerChip';
import PlayerForm from './components/PlayerForm/PlayerForm';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
        let localState = localStorage.getItem('pickTeams');
        let players = [];
        if(localState){
            players = JSON.parse(localState);
        }

        this.state = {
            players: players
        }
    }

    componentDidUpdate(){
        localStorage.setItem('pickTeams', JSON.stringify(this.state.players));
    }

    addPlayer = (playerName) => {
        let teamA = this.state.players.filter(player => player.team === 0),
            teamB = this.state.players.filter(player => player.team === 1),
            teamId = teamA.length <= teamB.length ? 0 : 1,
            playerNames = this.state.players.map(player => player.name);

        if(playerName && playerNames.indexOf(playerName) === -1){
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
        let teamA = this.playersByTeam(0),
            teamB = this.playersByTeam(1);

        return (
            <div>
                <div id="controls">
                    <PlayerForm onSubmit={this.addPlayer} />
                    <button id="randomise" onClick={this.randomise} disabled={this.state.players.length < 2}>Pick Teams</button>
                </div>
                <Pitch>
                    <div className={'players home teamCount'+teamA.length}>
                        <ReactCSSTransitionGroup component="div" transitionName="fade" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                            {teamA.map((player, i) => {
                                return <PlayerChip key={player.name} index={i} player={player.name} onClick={this.removePlayer}/>
                            })}
                        </ReactCSSTransitionGroup>
                    </div>
                    <div className={'players away teamCount'+teamB.length}>
                        <ReactCSSTransitionGroup component="div" transitionName="fade" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                            {teamB.map((player, i) => {
                                return <PlayerChip key={player.name} index={i} player={player.name} onClick={this.removePlayer}/>
                            })}
                        </ReactCSSTransitionGroup>
                    </div>
                </Pitch>
            </div>
        )
    }
}

export default App;
