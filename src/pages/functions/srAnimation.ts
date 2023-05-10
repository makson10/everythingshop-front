import React from 'react';

export async function animate(
	componentRef: React.MutableRefObject<HTMLDivElement | null>,
	duration: number,
	distance: string = '0px'
) {
	if (componentRef.current) {
		const sr = (await import('scrollreveal')).default;
		sr().reveal(componentRef.current, {
			duration: duration,
			distance: distance,
		});
	}
}
