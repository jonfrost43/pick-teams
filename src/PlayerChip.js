import React from 'react';

var PlayerChip = (props) => <span>{props.player}<button onClick={props.onClick} data-player={props.player}>x</button></span>;

export default PlayerChip;
