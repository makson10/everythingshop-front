import React from 'react';

interface Props {
	children: React.ReactNode;
}

export default function HomePageBg({ children }: Props) {
	return (
		<div
			id="home-page-bg"
			style={{
				backgroundColor: '#002222',
				display: 'flex',
				flexDirection: 'column',
				gap: '6rem',
			}}>
			{children}
		</div>
	);
}
