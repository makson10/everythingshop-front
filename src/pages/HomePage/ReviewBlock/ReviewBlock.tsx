import { useEffect, useRef } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import ReviewSection from './ReviewSection';
import PhotoBlock from './PhotoBlock';

export default function ReviewBlock() {
	const setUpSRAnim = useScrollReveal();
	const componentRef = useRef(null);

	useEffect(() => {
		setUpSRAnim(componentRef, 800, '10px');
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
