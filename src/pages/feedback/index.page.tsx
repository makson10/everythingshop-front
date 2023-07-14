import Header from '@/components/Header/Header';
import FeedbackPageContent from './FeedbackPageContent';

export default function Feedback() {
	return (
		<div className="h-screen flex flex-col">
			<Header pageName={'Feedback'} showCartIcon={false} />
			<FeedbackPageContent />
		</div>
	);
}
