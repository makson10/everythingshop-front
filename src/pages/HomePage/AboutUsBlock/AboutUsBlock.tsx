import { useEffect, useRef } from 'react';
import { animate } from '@/pages/functions/srAnimation';
import PhotoBlock from './PhotoBlock';
import TextBlock from './TextBlock';

export default function AboutUsBlock() {
	const componentRef = useRef(null);

	useEffect(() => {
		animate(componentRef, 800, '10px');
	}, []);

	return (
		<div
			className="flex flex-row justify-center gap-[20px] px-[3rem]"
			ref={componentRef}>
			<PhotoBlock />
			<div className="flex flex-col justify-center max-sm:w-screen max-sm:px-4">
				<TextBlock />
			</div>
		</div>
	);
}
