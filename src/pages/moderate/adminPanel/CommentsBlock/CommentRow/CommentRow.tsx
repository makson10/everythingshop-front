import { useRouter } from 'next/router';
import { IComment } from '@/pages/types/contextTypes';
import axios from 'axios';
import styles from './CommentRow.module.scss';

interface Props {
	comments: IComment[];
	toPost: string;
}

interface CommentProps {
	comment: IComment;
	toPost: string;
}

const CommentRow = ({ comments, toPost }: Props) => {
	if (!comments.length) return;

	return (
		<div id={styles['comment-row']}>
			{comments.map((comment, index) => {
				return <Comment comment={comment} toPost={toPost} key={index} />;
			})}
		</div>
	);
};

const Comment = ({ comment, toPost }: CommentProps) => {
	const router = useRouter();

	const handleClick = async () => {
		await axios.get('http://127.0.0.1:8000/products');
		await axios.post(
			`http://127.0.0.1:8000/products/deleteComment/${comment.uniqueCommentId}`
		);

		router.reload();
	};

	return (
		<div className="flex flex-row justify-between">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2">
					<img className="w-6 h-6" src={comment.picture} />
					{comment.name}, {new Date(comment.date).toLocaleString()}; to post{' '}
					{toPost}
				</div>
				<p>{comment.text}</p>
			</div>
			<button onClick={handleClick}>
				<img src="https://img.icons8.com/windows/30/null/trash.png" />
			</button>
		</div>
	);
};

export default CommentRow;
