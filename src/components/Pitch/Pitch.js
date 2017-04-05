import React from 'react';
import './Pitch.css';

var Pitch = (props) => {
	return (
		<div className="pitchContainer">
			<div className="pitch aspect-ratio">
				<div className="touchline"></div>
				<div className="halfwayline"></div>
				<div className="box18 home"></div>
				<div className="box6 home"></div>
				<div className="box18 away"></div>
				<div className="box6 away"></div>
				{props.children}
			</div>
		</div>
	)
};

export default Pitch;
