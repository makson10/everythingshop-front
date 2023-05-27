import AdminPanelBlock from '@/components/AdminPanelBlock/AdminPanelBlock';
import { FeedbackType } from '@/types/feedbackTypes';
import FeedbackRow from './FeedbackRow';

interface Props {
	feedbacks: FeedbackType;
}

export default function FeedbackBlock({ feedbacks }: Props) {
	return (
		<AdminPanelBlock blockTitle="Feedbacks">
			{feedbacks.length === 0 ? (
				<div className="flex justify-center items-center h-full">
					<p className="text-xl">No feedbacks yet</p>
				</div>
			) : (
				feedbacks.map((feedback, index) => {
					return <FeedbackRow feedback={feedback} key={index} />;
				})
			)}
		</AdminPanelBlock>
	);
}
