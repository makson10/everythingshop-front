import ContactBlock from './ContactBlock';
import HoursBlock from './HoursBlock';
import TitleBlock from './TitleBlock';

export default function Footer() {
	return (
		<footer className="flex flex-row justify-between bg-black text-white px-[2rem] py-[3rem]">
			<ContactBlock />
			<TitleBlock />
			<HoursBlock />
		</footer>
	);
}
