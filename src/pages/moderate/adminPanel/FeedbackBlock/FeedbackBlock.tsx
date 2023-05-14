import { FeedbackType } from '@/pages/types/feedbackTypes';
import FeedbackRow from './FeedbackRow';

interface Props {
	feedbacks: FeedbackType;
}

export default function FeedbackBlock({ feedbacks }: Props) {
	return (
		<div className="w-3/4 flex flex-col gap-[10px] max-sm:w-full">
			<p className="text-center text-[1.6rem] font-bold">Feedbacks</p>
			<div className="h-[200px] overflow-x-hidden overflow-y-scroll border-black border-[2px] p-4 flex flex-col gap-[10px] max-sm:h-[300px]">
				{feedbacks.length === 0 ? (
					<div className="flex justify-center items-center h-full">
						<p className="text-xl">No feedbacks yet</p>
					</div>
				) : (
					feedbacks.map((feedback, index) => {
						return <FeedbackRow feedback={feedback} key={index} />;
					})
				)}
			</div>
		</div>
	);
}
