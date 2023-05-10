import React, { useEffect, useRef } from 'react';
import InfoCard from './InfoCard/InfoCard';
import InfoTitle from './InfoTitle/InfoTitle';
import { cardData } from '../../assets/cardData';
import styles from './ChooseInfoSection.module.scss';
import { animate } from '@/pages/functions/srAnimation';

export default function ChooseInfoSection() {
	const componentRef = useRef(null);

	useEffect(() => {
		animate(componentRef, 800, '10px');
	}, []);

	return (
		<div className="flex flex-col gap-[80px]" ref={componentRef}>
			<InfoTitle />
			<div className="flex flex-row justify-center gap-[60px]">
				{cardData.map((el, index) => {
					return <InfoCard key={index} data={el} />;
				})}
			</div>
		</div>
	);
}
