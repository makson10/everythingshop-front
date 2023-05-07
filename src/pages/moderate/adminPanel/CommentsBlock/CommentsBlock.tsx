import CommentRow from './CommentRow/CommentRow';
import styles from './CommentsBlock.module.scss';
import { ProductType } from '@/pages/types/productTypes';

interface Props {
	products: ProductType;
}

export default function CommentsBlock({ products }: Props) {
	return (
		<div id={styles['users-data-block']}>
			<p id={styles['block-title']}>Comments</p>
			<div id={styles['users-list']}>
				{products.map((product, index) => {
					return <CommentRow key={index} comments={product.comments} toPost={product.title} />;
				})}
			</div>
		</div>
	);
}
