import React from 'react';
import styles from './TextBlock.module.scss';

export default function TextBlock() {
	return (
		<>
			<div id={styles['text-title-wrapper']}>
				<p id={styles['our-experience-subtitle']}>About Us</p>
				<p id={styles['our-experience-title']}>Our experience wonder</p>
			</div>
			<div id={styles['text-block-wrapper']}>
				<div id={styles['text-block-line']}></div>
				<div id={styles['text-wrapper-for-fucking-text']}>
					<p id={styles['text-block-text']}>
						We have around 25 years experience in this business. Our employee
						are professional workers, who can help you with your issues whenever
					</p>
				</div>
			</div>
		</>
	);
}
