import { useEffect, useRef } from 'react';
import { animate } from '@/pages/functions/srAnimation';
import { cardData } from '@/pages/assets/cardData';
import InfoCard from './InfoCard';
import Heading from './Heading';

export default function ChooseInfoSection() {
	const componentRef = useRef(null);

	useEffect(() => {
		animate(componentRef, 800, '10px');
	}, []);

	return (
		<div
			className="flex flex-col gap-[3rem] max-sm:p-4 text-base"
			ref={componentRef}>
			<Heading />
			<div className="flex flex-row justify-center gap-[60px] max-sm:flex-col">
				{cardData.map((el, index) => {
					return <InfoCard key={index} data={el} />;
				})}
			</div>
		</div>
	);
}
