import React from 'react';
import styles from './LeftTagline.module.scss';

export default function LeftTagline() {
	return (
		<div id={styles['left-text-block-wrapper']}>
			<p id={styles['top-section-subtitle']}>The best you've ever seen</p>
			<p id={styles['top-section-title-left']}>
				Marketplace
				<br />
				&emsp;&ensp;={'>'} for <b>all</b>
				<br />
				&emsp;&ensp;={'>'} from <b>all</b>
			</p>
		</div>
	);
}
