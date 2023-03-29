import React from 'react';
import "./FooterHoursBlock.scss";

export default function FooterHoursBlock() {
	return (
		<div className="footer-info-block">
			<div id="hours-block-title-wrapper">
				<div className="block-line"></div>
				<div id="hours-block-title" className="block-title">
					OPENING HOURS
				</div>
			</div>
			<div id="hours-info-block">
				<div className="hours-text-line">
					<p className="hours-text-line-left">Real shop</p>
					<p className="hours-text-line-right">we haven't it)</p>
				</div>
				<div className="hours-text-line">
					<p className="hours-text-line-left">Support service</p>
					<p className="hours-text-line-right">24/7</p>
				</div>
				<div className="hours-text-line">
					<p className="hours-text-line-left">Author of this site</p>
					<p className="hours-text-line-right">always want nutella</p>
				</div>
			</div>
		</div>
	);
}
