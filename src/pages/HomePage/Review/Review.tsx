import BlogPart from './Parts/BlogPart';
import PhotoPart from './Parts/PhotoPart';

export default function Review() {
	return (
		<div className="flex flex-row justify-between gap-[30px] px-[3rem] max-sm:flex-col">
			<BlogPart />
			<PhotoPart />
		</div>
	);
}
