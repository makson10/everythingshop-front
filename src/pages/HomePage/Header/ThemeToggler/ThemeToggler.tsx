import { useIsDarkTheme, useIsDarkThemeUpdate } from '@/hooks/useIsDarkTheme';
import Image from 'next/image';

export default function ThemeToggler() {
	const isDarkTheme = useIsDarkTheme();
	const { toggleIsDarkTheme } = useIsDarkThemeUpdate();

	return (
		<div className="flex items-center gap-4 w-2/12 max-sm:hidden">
			<Image
				src={
					isDarkTheme
						? '/everythingshop_logo.png'
						: '/everythingshop_logo_dark.png'
				}
				alt="#"
				width={185}
				height={50}
			/>
			<div>
				<div
					className="relative inline-block w-12 h-6 mr-2 align-middle select-none"
					onClick={toggleIsDarkTheme}>
					<div
						className={`absolute flex justify-center items-center w-6 h-6 rounded-full appearance-none cursor-pointer transition-all duration-300 transform ${
							isDarkTheme
								? 'translate-x-full bg-orange-600'
								: 'translate-x-0 bg-indigo-600'
						} focus-visible:outline-0`}>
						<Image
							className="w-[20px] h-[20px]"
							src={
								isDarkTheme
									? 'https://img.icons8.com/ios-glyphs/42/ffffff/moon-symbol.png'
									: `https://img.icons8.com/ios/42/ffffff/sun--v1.png`
							}
							alt="#"
							width={100}
							height={100}
						/>
					</div>
					<div className="block overflow-hidden h-full rounded-full bg-gray-400 cursor-pointer transition-all duration-300"></div>
				</div>
			</div>
		</div>
	);
}
