import { useEffect, useRef } from 'react';
import { animate } from '@/functions/srAnimation';
import ReviewSection from './ReviewSection';
import PhotoBlock from './PhotoBlock';

export default function ReviewBlock() {
	const componentRef = useRef(null);

	useEffect(() => {
		animate(componentRef, 800, '10px');
	}, []);

	return (
		<div
			className="flex flex-row justify-between gap-[30px] px-[3rem] max-sm:flex-col"
			ref={componentRef}>
			<ReviewSection />
			<PhotoBlock />
		</div>
	);
}
