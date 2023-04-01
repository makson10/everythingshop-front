import React, { useEffect, useRef } from 'react';
import InfoCard from './InfoCard/InfoCard';
import InfoTitle from './InfoTitle/InfoTitle';
import { cardData } from './cardData';
import styles from './ChooseInfoSection.module.scss';

export default function ChooseInfoSection() {
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
		<div id={styles["choose-info-wrapper"]} ref={componentRef}>
            <InfoTitle />
			<div id={styles["info-cards-wrapper"]}>
				{cardData.map((el, index) => {
					return <InfoCard key={index} data={el} />;
				})}
			</div>
		</div>
	);
}
