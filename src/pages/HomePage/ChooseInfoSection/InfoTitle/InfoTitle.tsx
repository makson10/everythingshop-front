import React from 'react';
import styles from './InfoTitle.module.scss';

export default function InfoTitle() {
	return (
		<div id={styles['info-text-wrapper']}>
			<p id={styles['info-text-title']}>Our adventures</p>
			<p id={styles['info-text-subtitle']}>
				The best marketplace which you can find anywhere, and here's why
			</p>
		</div>
	);
}
