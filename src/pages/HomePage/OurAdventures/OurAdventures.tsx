import { useEffect, useRef } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import { cardData } from '@/assets/cardData';
import InfoCard from './InfoCard';
import Heading from './Heading';

export default function ChooseInfoSection() {
	const setUpSRAnim = useScrollReveal();
	const componentRef = useRef(null);

	useEffect(() => {
		setUpSRAnim(componentRef, 800, '10px');
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
