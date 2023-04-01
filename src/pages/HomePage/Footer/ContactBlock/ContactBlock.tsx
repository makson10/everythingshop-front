import React from 'react';
import styles from './ContactBlock.module.scss';

export default function ContactBlock() {
	return (
		<div className={styles['footer-info-block']}>
			<div id={styles['contact-block-title-wrapper']}>
				<div className={styles['block-line']}></div>
				<p
					id={styles['contact-block-title']}
					className={styles['block-title']}>
					CONTACTS
				</p>
			</div>

			<div id={styles['contact-block-wrapper']}>
				<div
					id={styles['contact-block-address-wrapper']}
					className={styles['contact-wrapper']}>
					<img id={styles['address-icon']} src="address-icon.png" />
					<p id={styles['address-text']}>Redmond Washington 98052-6399</p>
				</div>
				<div
					id={styles['contact-block-phone-wrapper']}
					className={styles['contact-wrapper']}>
					<img id={styles['phone-icon']} src="phone-icon.png" />
					<p id={styles['phone-text']}>+1 200 3030</p>
				</div>
				<div
					id={styles['contact-block-email-wrapper']}
					className={styles['contact-wrapper']}>
					<img id={styles['email-icon']} src="email-icon.png" />
					<p id={styles['email-text']}>
						thebestmarketever@marketeverything.com
					</p>
				</div>
			</div>
		</div>
	);
}
