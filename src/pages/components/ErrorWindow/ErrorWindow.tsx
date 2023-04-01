import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import styles from './ErrorWindow.module.scss';

interface Props {
	errorList: string[];
}

export default function ErrorWindow({ errorList }: Props) {
	const windowProcessBar = useRef<HTMLProgressElement>(null);

	useEffect(() => {
		const progressBarInterval = setInterval(() => {
			if (windowProcessBar.current) {
				windowProcessBar.current.value -= 1;
			}
		}, 1);

		setTimeout(() => {
			clearInterval(progressBarInterval);
		}, 3000);
	}, []);

	return (
		<div id={styles["error-window-wrapper"]}>
			<div id={styles["error-window"]}>
				{errorList.map((el, index) => {
					return (
						<p key={index} className={styles["error-window-message"]}>{`${el}\n`}</p>
					);
				})}
				<progress
					ref={windowProcessBar}
					id={styles["progress-bar"]}
					max={1500}
					value={1500}></progress>
			</div>
		</div>
	);
}
