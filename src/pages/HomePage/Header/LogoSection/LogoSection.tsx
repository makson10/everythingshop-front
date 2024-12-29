import { useAppSelector } from '@/store/hooks';
import Logo from './Logo';
import ThemeToggler from './ThemeToggler';

export default function LogoSection() {
	const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);

	return (
		<div className="flex items-center gap-4 w-[15%] max-sm:w-full max-sm:justify-center">
			<Logo isDarkTheme={isDarkTheme} />
			<ThemeToggler />
		</div>
	);
}
