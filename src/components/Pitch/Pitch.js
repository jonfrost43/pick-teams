import React from 'react';
import './Pitch.css';

var Pitch = (props) => {
	return (
		<div className="pitch">
			<div className="touchline"></div>
			<div className="halfwayline"></div>
			<div className="box18"></div>
			<div className="box6"></div>
			<div className="box18 away"></div>
			<div className="box6 away"></div>
			{props.children}
		</div>
	)
};

export default Pitch;