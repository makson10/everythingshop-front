import React from 'react';
import styles from './MainBlock.module.scss';

export default function MainBlock() {
    return (
		<div id={styles["review-main-block"]}>
			<div id={styles["review-text-title-wrapper"]}>
				<p id={styles["review-text-subtitle"]}>Our review</p>
				<p id={styles["review-text-title"]}>Find out what people think about us</p>
			</div>
			<div id={styles['review-text-body-wrapper']}>
				<img
					id={styles["review-text-photo"]}
					src="https://i.pinimg.com/736x/b5/c7/64/b5c76413ca8dd6ee959c30fc370b93a0.jpg"
				/>
				<div id={styles["review-text-body-content"]}>
					<p id={styles["review-text-body-title"]}>
						In this company all is good, when there is good, and all is bad,
						when... never
					</p>
					<div id={styles["review-addition-text-block"]}>
						<p id={styles["review-text-body-name"]}>Louis Kohler</p>
						<p id={styles["review-text-body-post"]}>Customer Functionality Developer</p>
					</div>
				</div>
			</div>
		</div>
	);
}
