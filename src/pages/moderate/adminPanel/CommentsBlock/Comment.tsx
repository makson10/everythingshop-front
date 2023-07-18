import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IComment } from '@/types/commentTypes';
import axios from 'axios';

interface CommentProps {
	comment: IComment;
	productId: string;
	productName: string;
}

export default function Comment({
	comment,
	productId,
	productName,
}: CommentProps) {
	const router = useRouter();

	const handleClick = async () => {
		await axios.delete(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${productId}/deleteComment/${comment.uniqueCommentId}`
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
					{comment.author}, {new Date(comment.date).toLocaleString()}; to post{' '}
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
