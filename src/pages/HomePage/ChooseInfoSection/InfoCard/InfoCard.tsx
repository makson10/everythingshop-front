import React from 'react';
import styles from './InfoCard.module.scss';

interface Props {
	data: {
		titleText: string;
		bodyText: string;
		photoUrl: string;
	};
}

export default function InfoCard({ data }: Props) {
	return (
		<div className={styles['card-wrapper']}>
			<img src={data.photoUrl} className={styles['info-card-photo']} />
			<div className={styles['card-text-wrapper']}>
				<p className={styles['info-card-title']}>{data.titleText}</p>
				<p className={styles['info-card-body']}>{data.bodyText}</p>
			</div>
		</div>
	);
}
