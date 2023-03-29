import React from 'react';

export default function HomePageBg({ children }) {
	return (
		<div
			id="home-page-bg"
			style={{
				backgroundColor: '#002222',
				display: 'flex',
				flexDirection: 'column',
				gap: '6rem'
			}}>
			{children}
		</div>
	);
}
