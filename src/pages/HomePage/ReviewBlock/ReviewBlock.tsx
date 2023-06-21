import ReviewSection from './ReviewSection';
import PhotoBlock from './PhotoBlock';

export default function ReviewBlock() {
	return (
		<div className="flex flex-row justify-between gap-[30px] px-[3rem] max-sm:flex-col">
			<ReviewSection />
			<PhotoBlock />
		</div>
	);
}
