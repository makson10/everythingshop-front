import React from 'react';

interface Props {
	children: React.ReactNode;
}

export default function HomePageBg({ children }: Props) {
	return (
		<div
			id="home-page-bg"
			style={{
				backgroundColor: '#F6FFDE',
				display: 'flex',
				flexDirection: 'column',
				gap: '6rem',
                color: '#545B5A'
			}}>
			{children}
		</div>
	);
}
