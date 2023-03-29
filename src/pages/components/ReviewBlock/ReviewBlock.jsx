import React, { useEffect } from 'react';
import ReviewMainBlock from './ReviewMainBlock/ReviewMainBlock';
import ReviewPhotoBlock from './ReviewPhotoBlock/ReviewPhotoBlock';
import { setScrollReveal } from '../../../functions/setScrollReveal';
import './ReviewBlock.scss';

export default function ReviewBlock() {
	useEffect(() => {
        setScrollReveal('#review-block-wrapper', 800, '10px');
	}, []);

	return (
		<div id="review-block-wrapper">
			<ReviewMainBlock />
			<ReviewPhotoBlock />
		</div>
	);
}
