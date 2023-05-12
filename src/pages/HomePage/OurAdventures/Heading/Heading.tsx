import styles from './Heading.module.css';

export default function Heading() {
	return (
		<div id={styles['info-text-wrapper']}>
			<p id={styles['info-text-title']}>Our adventures</p>
			<p id={styles['info-text-subtitle']}>
				The best marketplace which you can find anywhere, and here's why
			</p>
		</div>
	);
}
