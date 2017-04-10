import React from 'react';
import './PlayerChip.css';

var PlayerChip = (props) => (
	<div className={'playerChip pos'+(props.index+1)}>
		<span>{props.player}<button onClick={props.onClick} data-player={props.player}>x</button></span>
	</div>
);

export default PlayerChip;
