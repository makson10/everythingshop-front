import styles from './PaginationBar.module.scss';

interface Props {
	onPageChange: (page: number) => void;
	productsAmount: number;
	currentPage: number;
	showingProductAmount: number;
}

export function PaginationBar({
	onPageChange,
	productsAmount,
	currentPage,
	showingProductAmount,
}: Props) {
	const pagesAmount = Math.ceil(productsAmount / showingProductAmount);

	if (pagesAmount < 2) return null;
	const pages = Array.from({ length: pagesAmount }, (_, i) => i + 1);

	return (
		<div id={styles['pagination-bar-wrapper']}>
			<div id={styles['pagination-bar']}>
				{pages.map((page, index) => (
					<button
						key={index}
						id={
							page === currentPage
								? styles['current-page-pagination-button']
								: styles['pagination-button']
						}
						onClick={() => onPageChange(page)}>
						{page}
					</button>
				))}
			</div>
		</div>
	);
}
