import React from 'react';
import styles from './HintWindow.module.scss';

export function HintWindow() {
	return (
		<div id={styles['hint-window']}>
			<p id={styles['hint-window-text']}>You cannot add product to cart while you are not authorized</p>
		</div>
	);
}
