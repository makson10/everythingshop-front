import PhotoBlock from './PhotoBlock';
import TextBlock from './TextBlock';

export default function AboutUsBlock() {
	return (
		<div className="flex flex-row justify-center gap-[20px] px-[3rem]">
			<PhotoBlock />
			<div className="flex flex-col justify-center max-sm:w-screen max-sm:px-4">
				<TextBlock />
			</div>
		</div>
	);
}
