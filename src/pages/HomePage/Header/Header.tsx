import LogoSection from './LogoSection/LogoSection';
import NavBar from './NavBar/NavBar';
import UserSection from './UserSection/UserSection';

export default function Header() {
	return (
		<header className="flex flex-row justify-between px-12 py-8 max-sm:gap-6 max-sm:flex-col">
			<LogoSection />
			<NavBar />
			<UserSection />
		</header>
	);
}
