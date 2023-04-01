import React from 'react';
import styles from './PhotoBlock.module.scss';

export default function PhotoBlock() {
	return (
		<div id={styles['our-experience-photo-wrapper']}>
			<div id={styles['photo-wrapper-with-caption']}>
				<img
					id={styles['our-experience-photo']}
					src="https://media.istockphoto.com/id/1224234335/photo/conceptual-photo-of-happy-girl-holds-shopping-packages-on-blue-background.jpg?s=612x612&w=0&k=20&c=5bgmMIx7xbO6e61nd7nDUKY44P2zLU2IsTDfZ6RyI4g="
				/>
				<p id={styles['our-experience-photo-caption']}>
					25+ Years of Experience
				</p>
			</div>
		</div>
	);
}
