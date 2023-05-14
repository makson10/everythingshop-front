import OptionSection from './OptionSection';
import UserButton from './UserButton/UserButton';

export default function Header() {
	return (
		<header className="flex flex-row justify-between px-12 py-8 max-sm:gap-6 max-sm:flex-col">
			<div className="flex items-center w-2/12 max-sm:hidden">
				<img src="./everythingshop_logo_dark.png" />
			</div>
			<OptionSection />
			<div
				className="flex max-sm:justify-center">
				<UserButton />
			</div>
		</header>
	);
}
