import React from 'react';
import './PlayerChip.css';

var PlayerChip = (props) => <span className="playerChip">{props.player}<button onClick={props.onClick} data-player={props.player}>x</button></span>;

export default PlayerChip;
