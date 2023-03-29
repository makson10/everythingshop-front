import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import './ErrorWindow.scss';

export default function ErrorWindow({ errorList }) {
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
		<div id="error-window-wrapper">
			<div id="error-window">
				{errorList.map((el, index) => {
					return (
						<p key={index} className="error-window-message">{`${el}\n`}</p>
					);
				})}
				<progress ref={windowProcessBar} id="progress-bar" max={1500} value={1500}></progress>
			</div>
		</div>
	);
}
