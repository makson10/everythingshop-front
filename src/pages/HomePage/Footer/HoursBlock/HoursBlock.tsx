import React from 'react';
import styles from './HoursBlock.module.scss';

export default function HoursBlock() {
	return (
		<div className={styles["footer-info-block"]}>
			<div id={styles["hours-block-title-wrapper"]}>
				<div className={styles["block-line"]}></div>
				<div id={styles["hours-block-title"]} className={styles["block-title"]}>
					OPENING HOURS
				</div>
			</div>
			<div id={styles["hours-info-block"]}>
				<div className={styles["hours-text-line"]}>
					<p className={styles["hours-text-line-left"]}>Real shop</p>
					<p className={styles["hours-text-line-right"]}>we haven't it)</p>
				</div>
				<div className={styles["hours-text-line"]}>
					<p className={styles["hours-text-line-left"]}>Support service</p>
					<p className={styles["hours-text-line-right"]}>24/7</p>
				</div>
				<div className={styles["hours-text-line"]}>
					<p className={styles["hours-text-line-left"]}>Author of this site</p>
					<p className={styles["hours-text-line-right"]}>always want nutella</p>
				</div>
			</div>
		</div>
	);
}
