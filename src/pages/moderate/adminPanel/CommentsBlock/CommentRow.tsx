import Comment from './Comment';
import { CommentType } from '@/types/commentTypes';

interface Props {
	comments: CommentType;
	productId: string;
	productName: string;
}

export default function CommentRow({
	comments,
	productId,
	productName,
}: Props) {
	return (
		<>
			{comments.map((comment, index) => {
				return (
					<div
						key={index}
						className="flex flex-col gap-[5px] p-[0.5rem] border-b-2 border-b-[gray]">
						<Comment
							comment={comment}
							productId={productId}
							productName={productName}
						/>
					</div>
				);
			})}
		</>
	);
}
