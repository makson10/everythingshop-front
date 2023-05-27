import AdminPanelBlock from '@/components/AdminPanelBlock/AdminPanelBlock';
import { ProductType } from '@/types/productTypes';
import CommentRow from './CommentRow';

interface Props {
	products: ProductType;
}

export default function CommentsBlock({ products }: Props) {
	return (
		<AdminPanelBlock blockTitle="Comments">
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
		</AdminPanelBlock>
	);
}
