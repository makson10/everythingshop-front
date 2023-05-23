import { useEffect, useRef } from 'react';
import { animate } from '@/functions/srAnimation';
import LeftTagline from './LeftTagline';
import RightTagline from './RightTagline';

export default function TaglineBlock() {
	const componentRef = useRef(null);

	useEffect(() => {
		animate(componentRef, 1000);
	}, []);

	return (
		<div
			className="h-[64vh] flex flex-row justify-between items-center gap-4 max-sm:flex-col max-sm:h-fit"
			ref={componentRef}>
			<LeftTagline />
			<RightTagline />
		</div>
	);
}
