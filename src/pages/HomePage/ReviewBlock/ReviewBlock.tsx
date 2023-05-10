import { useEffect, useRef } from 'react';
import { animate } from '@/pages/functions/srAnimation';
import MainBlock from './MainBlock/MainBlock';
import PhotoBlock from './PhotoBlock/PhotoBlock';

export default function ReviewBlock() {
	const componentRef = useRef(null);

	useEffect(() => {
		animate(componentRef, 800, '10px');
	}, []);

	return (
		<div
			className="flex flex-row justify-between gap-[30px] px-[3rem]"
			ref={componentRef}>
			<MainBlock />
			<PhotoBlock />
		</div>
	);
}
