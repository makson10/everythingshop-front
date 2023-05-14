import { ProductType } from '@/pages/types/productTypes';
import CommentRow from './CommentRow';
import styles from './CommentsBlock.module.css';

interface Props {
	products: ProductType;
}

export default function CommentsBlock({ products }: Props) {
	return (
		<div id={styles['comments-block']}>
			<p id={styles['block-title']}>Comments</p>
			<div id={styles['comments-list']}>
				{products.every((product) => product.comments.length === 0) ? (
					<div className="flex justify-center items-center h-full">
						<p className="text-xl">No comments yet</p>
					</div>
				) : (
					products.map((product, index) => {
						return (
							<CommentRow
								key={index}
								comments={product.comments}
								toPost={product.title}
							/>
						);
					})
				)}
			</div>
		</div>
	);
}
