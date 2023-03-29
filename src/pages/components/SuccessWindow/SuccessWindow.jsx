import React, { useEffect } from 'react';
import { useRef } from 'react';
import './SuccessWindow.scss';

export default function SuccessWindow({ typeOfSuccess }) {
	const windowProcessBar = useRef();

	useEffect(() => {
		const progressBarInterval = setInterval(() => {
			windowProcessBar.current.value -= 1;
		}, 1);

		setTimeout(() => {
			clearInterval(progressBarInterval);
		}, 3000);
	}, []);

	return (
		<div id="success-window-wrapper">
			<div id="success-window">
				<p id="success-window-message">You have {typeOfSuccess} successful</p>
				<progress
					ref={windowProcessBar}
					id="progress-bar"
					max={1500}
					value={1500}></progress>
			</div>
		</div>
	);
}
