import styles from './PhotoBlock.module.css';

export default function PhotoBlock() {
	return (
		<div id={styles['review-photo-block']}>
			<img
				id={styles['review-photo-small']}
				src="https://a.cdn-hotels.com/gdcs/production171/d1558/d5250534-92b6-413c-bedf-2b9ac96e96fe.jpg?impolicy=fcrop&w=800&h=533&q=medium"
			/>
			<img
				id={styles['review-photo-large']}
				src="https://www.retailgazette.co.uk/wp-content/uploads/Shopping-centre_Hammerson_generic_PA-1.jpg"
			/>
		</div>
	);
}
