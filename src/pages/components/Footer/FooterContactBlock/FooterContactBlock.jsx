import React from 'react';
import './FooterContactBlock.scss';

export default function FooterContactBlock() {
	return (
		<div className="footer-info-block">
			<div id="contact-block-title-wrapper">
				<div className="block-line"></div>
				<div id="contact-block-title" className="block-title">
					CONTACTS
				</div>
			</div>

			<div id="contact-block-wrapper">
				<div id="contact-block-address-wrapper" className="contact-wrapper">
					<img id="address-icon" src="address-icon.png" />
					<p id="address-text">Redmond Washington 98052-6399</p>
				</div>
				<div id="contact-block-phone-wrapper" className="contact-wrapper">
					<img id="phone-icon" src="phone-icon.png" />
					<p id="phone-text">+1 200 3030</p>
				</div>
				<div id="contact-block-email-wrapper" className="contact-wrapper">
					<img id="email-icon" src="email-icon.png" />
					<p id="email-text">thebestmarketever@marketeverything.com</p>
				</div>
			</div>
		</div>
	);
}
