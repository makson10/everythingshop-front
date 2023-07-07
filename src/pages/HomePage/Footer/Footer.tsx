import ContactPart from './Parts/ContactPart';
import TitlePart from './Parts/TitlePart';
import HoursPart from './Parts/HoursPart';

export default function Footer() {
	return (
		<footer className="flex flex-row justify-between bg-black text-white px-[2rem] py-[3rem] max-sm:flex-col max-sm:gap-12 max-sm:w-screen max-sm:rounded-t-3xl">
			<ContactPart />
			<TitlePart />
			<HoursPart />
		</footer>
	);
}
