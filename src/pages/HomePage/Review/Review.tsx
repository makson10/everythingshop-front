import HeadingPart from './Parts/HeadingPart';
import BlogPart from './Parts/BlogPart';
import PhotoPart from './Parts/PhotoPart';

export default function Review() {
	return (
		<div>
			<HeadingPart />
			<div className="flex flex-row justify-between gap-[30px] px-12 max-sm:flex-col">
				<BlogPart />
				<PhotoPart />
			</div>
		</div>
	);
}
