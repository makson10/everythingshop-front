import { useRouter } from 'next/router';
import { IFeedback } from '@/pages/types/feedbackTypes';
import axios from 'axios';

interface Props {
	feedback: IFeedback;
}

const FeedbackRow = ({ feedback }: Props) => {
	const router = useRouter();

	const handleClick = async () => {
		await axios.get('http://127.0.0.1:8000/feedback');
		await axios.post(
			`http://127.0.0.1:8000/feedback/deleteFeedback/${feedback.uniqueFeedbackId}`
		);

		router.reload();
	};

	return (
		<div className="flex flex-col gap-[5px] p-[0.5rem] border-b-2 border-b-[gray]">
			<div className="flex flex-row justify-between">
				<div className="flex flex-col gap-2 w-11/12">
					<div className="flex flex-row gap-2">
						{feedback.userName}, {new Date(feedback.date).toLocaleString()}
					</div>
					<p className="break-all">{feedback.feedbackText}</p>
				</div>
				<button onClick={handleClick}>
					<img src="https://img.icons8.com/windows/30/null/trash.png" />
				</button>
			</div>
		</div>
	);
};

export default FeedbackRow;
