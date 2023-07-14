import PhotoPart from './Parts/PhotoPart';
import TextPart from './Parts/TextPart';

export default function AboutUs() {
	return (
		<div className="flex flex-row justify-center gap-[20px] px-[3rem]">
			<PhotoPart />
			<div className="flex flex-col justify-center max-sm:w-screen max-sm:px-4">
				<TextPart />
			</div>
		</div>
	);
}
