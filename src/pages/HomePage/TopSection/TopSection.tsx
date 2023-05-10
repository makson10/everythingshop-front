import React, { useEffect, useRef } from 'react';
import LeftBlock from './LeftBlock/LeftBlock';
import RightBlock from './RightBlock/RightBlock';
import styles from './TopSection.module.scss';
import { animate } from '@/pages/functions/srAnimation';


export default function TopSection() {
	const componentRef = useRef(null);

	useEffect(() => {
		animate(componentRef, 1000);
	}, []);

	return (
		<div id={styles['top-section-wrapper']} ref={componentRef}>
			<LeftBlock />
			<RightBlock />
		</div>
	);
}
