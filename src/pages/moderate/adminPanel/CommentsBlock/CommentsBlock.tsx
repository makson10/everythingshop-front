import { ProductType } from '@/pages/types/productTypes';
import CommentRow from './CommentRow';
import styles from './CommentsBlock.module.css';

interface Props {
	products: ProductType;
}

export default function CommentsBlock({ products }: Props) {
	return (
		<div className="w-3/4 flex flex-col gap-[10px] max-sm:w-full">
			<p className="text-center text-[1.6rem] font-bold">Comments</p>
			<div className="h-[200px] overflow-x-hidden overflow-y-scroll border-black border-[2px] p-4 flex flex-col gap-[10px] max-sm:h-[300px]">
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
