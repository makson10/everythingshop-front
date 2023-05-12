import { useEffect, useRef } from 'react';
import { animate } from '@/pages/functions/srAnimation';
import LeftTagline from './LeftTagline/LeftTagline';
import RightTagline from './RightTagline/RightTagline';
import styles from './TaglineBlock.module.css';

export default function TaglineBlock() {
	const componentRef = useRef(null);

	useEffect(() => {
		animate(componentRef, 1000);
	}, []);

	return (
		<div id={styles['top-section-wrapper']} ref={componentRef}>
			<LeftTagline />
			<RightTagline />
		</div>
	);
}
