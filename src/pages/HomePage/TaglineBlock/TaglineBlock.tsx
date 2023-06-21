import LeftTagline from './LeftTagline';
import RightTagline from './RightTagline';

export default function TaglineBlock() {
	return (
		<div className="h-[64vh] flex flex-row justify-between items-center gap-4 max-sm:flex-col max-sm:h-fit">
			<LeftTagline />
			<RightTagline />
		</div>
	);
}
