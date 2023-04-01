import React, { useEffect, useRef } from 'react';
import MainBlock from './MainBlock/MainBlock';
import PhotoBlock from './PhotoBlock/PhotoBlock';
import styles from './ReviewBlock.module.scss';

export default function ReviewBlock() {
    const componentRef = useRef(null);

    useEffect(() => {
        async function animate() {
            if (componentRef.current) {
                const sr = (await import('scrollreveal')).default;
                sr().reveal(componentRef.current, { duration: 800, distance: '10px' });
            }
        }

        animate();
	}, []);

	return (
		<div id={styles["review-block-wrapper"]} ref={componentRef}>
			<MainBlock />
			<PhotoBlock />
		</div>
	);
}
