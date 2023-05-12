import { FeedbackType } from '@/pages/types/feedbackTypes';
import FeedbackRow from './FeedbackRow';
import styles from './FeedbackBlock.module.css';

interface Props {
	feedbacks: FeedbackType;
}

export default function FeedbackBlock({ feedbacks }: Props) {
	return (
		<div id={styles['feedback-block']}>
			<p id={styles['block-title']}>Feedbacks</p>
			<div id={styles['feedback-list']}>
				{feedbacks.map((feedback, index) => {
					return <FeedbackRow feedback={feedback} key={index} />;
				})}
			</div>
		</div>
	);
}
