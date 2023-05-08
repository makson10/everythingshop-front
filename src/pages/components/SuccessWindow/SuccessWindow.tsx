import React, { useEffect } from 'react';
import { useRef } from 'react';
import styles from './SuccessWindow.module.scss';

interface Props {
	typeOfSuccess: string;
}

export default function SuccessWindow({ typeOfSuccess }: Props) {
	const windowProcessBar = useRef<HTMLProgressElement>(null);

	useEffect(() => {
		const progressBarInterval = setInterval(() => {
			if (windowProcessBar.current) {
				windowProcessBar.current.value -= 3;
			}
		}, 1);

		setTimeout(() => {
			clearInterval(progressBarInterval);
		}, 1000);
	}, []);

	return (
		<div id={styles['success-window-wrapper']}>
			<div id={styles['success-window']}>
				<p id={styles['success-window-message']}>
					You have {typeOfSuccess} successful
				</p>
				<progress
					ref={windowProcessBar}
					id={styles['progress-bar']}
					max={1500}
					value={1500}></progress>
			</div>
		</div>
	);
}
