import React from 'react';
import './InfoCard.scss';

export default function InfoCard({ data }) {
	return (
		<div className="card-wrapper">
			<img src={data.photoUrl} className="info-card-photo" />
			<div className="card-text-wrapper">
				<p className="info-card-title">{data.titleText}</p>
				<p className="info-card-body">{data.bodyText}</p>
			</div>
		</div>
	);
}
