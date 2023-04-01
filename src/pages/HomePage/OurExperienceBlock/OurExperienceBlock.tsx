import React, { useEffect, useRef } from 'react';
import PhotoBlock from './PhotoBlock/PhotoBlock';
import TextBlock from './TextBlock/TextBlock';
import styles from './OurExperienceBlock.module.scss';

export default function OurExperienceBlock() {
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
		<div id={styles["our-experience-block-wrapper"]} ref={componentRef}>
			<PhotoBlock />
			<div id={styles["our-experience-block-text-wrapper"]}>
				<TextBlock />
			</div>
		</div>
	);
}
