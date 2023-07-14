import { useDarkTheme } from '@/hooks/useDarkTheme';
import Logo from './Logo';
import ThemeToggler from './ThemeToggler';

export default function LogoSection() {
	const isDarkTheme = useDarkTheme();

	return (
		<div className="flex items-center gap-4 w-2/12 max-sm:w-full max-sm:justify-center">
			<Logo isDarkTheme={isDarkTheme} />
			<ThemeToggler />
		</div>
	);
}
