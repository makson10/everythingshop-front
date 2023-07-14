import LeftPart from './Parts/LeftPart';
import RightPart from './Parts/RightPart';

export default function Tagline() {
	return (
		<div className="h-[64vh] flex flex-row justify-between items-center gap-4 max-sm:flex-col max-sm:h-fit">
			<LeftPart />
			<RightPart />
		</div>
	);
}
