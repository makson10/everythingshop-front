import React, { useEffect } from 'react';
import { setScrollReveal } from '../../../functions/setScrollReveal';
import TopSectionLeftBlock from './TopSectionLeftBlock/TopSectionLeftBlock';
import TopSectionRightBlock from './TopSectionRightBlock/TopSectionRightBlock';
import './TopSection.scss';

export default function TopSection() {
    useEffect(() => {
		setScrollReveal('#top-section-wrapper', 1000);
	}, []);

	return (
		<div id="top-section-wrapper">
			<TopSectionLeftBlock />
			<TopSectionRightBlock />
		</div>
	);
}
