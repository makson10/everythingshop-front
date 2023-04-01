import React, { useEffect, useRef } from 'react';
import LeftBlock from './LeftBlock/LeftBlock';
import RightBlock from './RightBlock/RightBlock';
import styles from './TopSection.module.scss';

export default function TopSection() {
    const componentRef = useRef(null);

    useEffect(() => {
        async function animate() {
            if (componentRef.current) {
                const sr = (await import('scrollreveal')).default;
                sr().reveal(componentRef.current, { duration: 1000 });
            }
        }

        animate();
	}, []);

	return (
		<div id={styles['top-section-wrapper']} ref={componentRef}>
			<LeftBlock />
			<RightBlock />
		</div>
	);
}
