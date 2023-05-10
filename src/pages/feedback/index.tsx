import Header from '@/pages/components/Header/Header';
import FeedbackForm from './FeedbackForm';

export default function Feedback() {
	return (
		<div className="h-screen flex flex-col">
			<Header pageName={'Feedback'} showCartIcon={false} />
			<FeedbackForm />
		</div>
	);
}
