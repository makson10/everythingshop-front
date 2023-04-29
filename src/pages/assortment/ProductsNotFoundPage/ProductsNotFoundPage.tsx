import styles from './ProductsNotFoundPage.module.scss';

export function ProductsNotFoundPage() {
	return (
		<div id={styles['fail-window-wrapper']}>
			<div id={styles['fail-window']}>
				<p id={styles['fail-window-text']}>
					We have not found some product with this sort/filter/search parameters
				</p>
			</div>
		</div>
	);
}
