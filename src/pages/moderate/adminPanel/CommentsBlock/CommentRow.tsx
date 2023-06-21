import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { IComment, CommentType } from '@/types/commentTypes';
import axios from 'axios';
import Link from 'next/link';

interface Props {
	comments: CommentType;
	productId: string;
	productName: string;
}

interface CommentProps {
	comment: IComment;
	productId: string;
	productName: string;
}

export default function CommentRow({
	comments,
	productId,
	productName,
}: Props) {
	return (
		<div className="flex flex-col gap-[5px] p-[0.5rem] border-b-2 border-b-[gray]">
			{comments.map((comment, index) => {
				return (
					<Comment
						comment={comment}
						productId={productId}
						productName={productName}
						key={index}
					/>
				);
			})}
		</div>
	);
}

function Comment({ comment, productId, productName }: CommentProps) {
	const router = useRouter();

	const handleClick = async () => {
		await axios.delete(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/deleteComment/${productId}/${comment.uniqueCommentId}`
		);

		router.reload();
	};

	return (
		<div className="flex flex-row justify-between">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2">
					<Image
						className="w-6 h-6 rounded"
						src={comment.picture}
						alt="#"
						width={100}
						height={100}
					/>
					{comment.name}, {new Date(comment.date).toLocaleString()}; to post{' '}
					<Link
						className="hover:underline"
						href={`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/assortment/${productId}`}>
						{productName}
					</Link>
				</div>
				<p>{comment.text}</p>
			</div>
			<button onClick={handleClick}>
				<Image
					src="https://img.icons8.com/windows/100/null/trash.png"
					alt="#"
					width={30}
					height={30}
				/>
			</button>
		</div>
	);
}
