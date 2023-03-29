import React from 'react';
import './ReviewMainBlock.scss';

export default function ReviewMainBlock() {
    return (
		<div id="review-main-block">
			<div id="review-text-title-wrapper">
				<p id="review-text-subtitle">Our review</p>
				<p id="review-text-title">Find out what people think about us</p>
			</div>
			<div id="review-text-body-wrapper">
				<img
					id="review-text-photo"
					src="https://i.pinimg.com/736x/b5/c7/64/b5c76413ca8dd6ee959c30fc370b93a0.jpg"
				/>
				<div id="review-text-body-content">
					<p id="review-text-body-title">
						In this company all is good, when there is good, and all is bad,
						when... never
					</p>
					<div id="review-addition-text-block">
						<p id="review-text-body-name">Louis Kohler</p>
						<p id="review-text-body-post">Customer Functionality Developer</p>
					</div>
				</div>
			</div>
		</div>
	);
}
