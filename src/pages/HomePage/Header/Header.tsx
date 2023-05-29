import NavBar from './NavBar/NavBar';
import ThemeToggler from './ThemeToggler/ThemeToggler';
import UserButton from './UserButton/UserButton';

export default function Header() {
	return (
		<header className="flex flex-row justify-between px-12 py-8 max-sm:gap-6 max-sm:flex-col">
			<ThemeToggler />
			<NavBar />
			<div className="flex max-sm:justify-center">
				<UserButton />
			</div>
		</header>
	);
}
