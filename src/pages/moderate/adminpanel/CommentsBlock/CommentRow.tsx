import { IProduct } from '@/types/productTypes';
import Comment from './Comment';
import { CommentType } from '@/types/commentTypes';

interface Props {
	comments: CommentType;
	product: IProduct;
}

export default function CommentRow({ comments, product }: Props) {
	return (
		<>
			{comments.map((comment, index) => {
				return (
					<div
						key={index}
						className="flex flex-col gap-[5px] p-[0.5rem] border-b-2 border-b-[gray]">
						<Comment comment={comment} product={product} />
					</div>
				);
			})}
		</>
	);
}
