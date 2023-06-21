import { useRouter } from 'next/router';
import Image from 'next/image';
import { IFeedback } from '@/types/feedbackTypes';
import axios from 'axios';

interface Props {
	feedback: IFeedback;
}

const FeedbackRow = ({ feedback }: Props) => {
	const router = useRouter();

	const handleClick = async () => {
		await axios.delete(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/feedbacks/deleteFeedback/${feedback.uniqueFeedbackId}`
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
					<Image
						src="https://img.icons8.com/windows/30/null/trash.png"
						alt="#"
						width={30}
						height={30}
					/>
				</button>
			</div>
		</div>
	);
};

export default FeedbackRow;
