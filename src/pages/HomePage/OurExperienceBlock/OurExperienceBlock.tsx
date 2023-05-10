import React, { useEffect, useRef } from 'react';
import PhotoBlock from './PhotoBlock/PhotoBlock';
import TextBlock from './TextBlock/TextBlock';
import { animate } from '@/pages/functions/srAnimation';
import styles from './OurExperienceBlock.module.scss';

export default function OurExperienceBlock() {
	const componentRef = useRef(null);

	useEffect(() => {
		animate(componentRef, 800, '10px');
	}, []);

	return (
		<div id={styles['our-experience-block-wrapper']} ref={componentRef}>
			<PhotoBlock />
			<div className='flex flex-col justify-center'>
				<TextBlock />
			</div>
		</div>
	);
}
