import React, { useEffect } from 'react';
import './ChooseInfoSection.scss';
import InfoCard from './InfoCard/InfoCard';
import { cardData } from './cardData';
import InfoTitle from './InfoTitle/InfoTitle';
import { setScrollReveal } from '../../../functions/setScrollReveal';

export default function ChooseInfoSection() {
    useEffect(() => {
        setScrollReveal('#choose-info-wrapper', 800, '10px');
	}, []);

	return (
		<div id="choose-info-wrapper">
            <InfoTitle />
			<div id="info-cards-wrapper">
				{cardData.map((el, index) => {
					return <InfoCard key={index} data={el} />;
				})}
			</div>
		</div>
	);
}
