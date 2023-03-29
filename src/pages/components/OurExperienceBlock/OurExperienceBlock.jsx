import React, { useEffect } from 'react';
import OurExperiencePhotoBlock from './OurExperiencePhotoBlock/OurExperiencePhotoBlock';
import OurExperienceTextBlock from './OurExperienceTextBlock/OurExperienceTextBlock';
import { setScrollReveal } from '../../../functions/setScrollReveal';
import './OurExperienceBlock.scss';

export default function OurExperienceBlock() {
    useEffect(() => {
        setScrollReveal('#our-experience-block-wrapper', 800, '10px');
	}, []);

	return (
		<div id="our-experience-block-wrapper">
			<OurExperiencePhotoBlock />
			<div id="our-experience-block-text-wrapper">
				<OurExperienceTextBlock />
			</div>
		</div>
	);
}
