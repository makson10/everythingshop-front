import ContactBlock from './Sections/ContactBlock';
import HoursBlock from './Sections/HoursBlock';
import TitleBlock from './Sections/TitleBlock';

export default function Footer() {
	return (
		<footer className="flex flex-row justify-between bg-black text-white px-[2rem] py-[3rem] max-sm:flex-col max-sm:gap-12 max-sm:w-screen max-sm:rounded-t-3xl">
			<ContactBlock />
			<TitleBlock />
			<HoursBlock />
		</footer>
	);
}
