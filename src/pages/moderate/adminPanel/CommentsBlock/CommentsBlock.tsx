import { memo } from 'react';
import AdminPanelBlock from '@/components/AdminPanelBlock/AdminPanelBlock';
import { ProductType } from '@/types/productTypes';
import CommentRow from './CommentRow';

interface Props {
	products: ProductType;
}

export default function CommentsBlock({ products }: Props) {
	const CommentsList = memo(function CommentsList({ products }: Props) {
		return (
			<>
				{products.map((product, index) => {
					return (
						<CommentRow
							key={index}
							comments={product.comments}
							productId={product.uniqueProductId}
							productName={product.title}
						/>
					);
				})}
			</>
		);
	});

	return (
		<AdminPanelBlock blockTitle="Comments">
			{products.every((product) => product.comments.length === 0) ? (
				<div className="flex justify-center items-center h-full">
					<p className="text-xl">No comments yet</p>
				</div>
			) : (
				<CommentsList products={products} />
			)}
		</AdminPanelBlock>
	);
}
