import { useRouter } from 'next/router';
import Image from 'next/image';
import { IComment, CommentType } from '@/types/commentTypes';
import axios from 'axios';

interface Props {
	comments: CommentType;
	toPost: string;
}

interface CommentProps {
	comment: IComment;
	toPost: string;
}

export default function CommentRow({ comments, toPost }: Props) {
	if (!comments.length) return null;

	return (
		<div className="flex flex-col gap-[5px] p-[0.5rem] border-b-2 border-b-[gray]">
			{comments.map((comment, index) => {
				return <Comment comment={comment} toPost={toPost} key={index} />;
			})}
		</div>
	);
}

function Comment({ comment, toPost }: CommentProps) {
	const router = useRouter();

	const handleClick = async () => {
		await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products`);
		await axios.post(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/deleteComment/${comment.uniqueCommentId}`
		);

		router.reload();
	};

	return (
		<div className="flex flex-row justify-between">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2">
					<Image
						className="w-6 h-6"
						src={comment.picture}
						alt="#"
						width={100}
						height={100}
					/>
					{comment.name}, {new Date(comment.date).toLocaleString()}; to post{' '}
					{toPost}
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
