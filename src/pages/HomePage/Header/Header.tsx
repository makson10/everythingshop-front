import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import NavBar from './NavBar';
import UserButton from './UserButton/UserButton';
import useIsDarkTheme from '@/hooks/useIsDarkTheme';

export default function Header() {
	const isDarkTheme = useIsDarkTheme();
	const [isTogglerPressed, setIsTogglerPressed] = useState<boolean>(false);

	const handleTogglerPressed = () => {
		setIsTogglerPressed((prevValue) => !prevValue);
	};

	useEffect(() => {
		console.log(isTogglerPressed);
	}, [isTogglerPressed]);

	return (
		<header className="flex flex-row justify-between px-12 py-8 max-sm:gap-6 max-sm:flex-col">
			<div className="flex items-center gap-4 w-2/12 max-sm:hidden">
				<img
					src={
						isDarkTheme
							? './everythingshop_logo.png'
							: './everythingshop_logo_dark.png'
					}
				/>
				<div>
					<div className="flex items-center">
						<label className="relative inline-block w-[60px] h-[34px] ">
							<input
								className="opacity-0 w-0 h-0"
								type="checkbox"
								onClick={handleTogglerPressed}
							/>
							<span
								className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#ccc] transition-[.4s] rounded-[34px] before:content-none before:rounded-full before:h-[26px] before:w-[26px] before:left-[4px] before:bottom-[4px] before:bg-white before:transition-[.4s] ${
									isTogglerPressed
										? 'before:translate-x-[26px]'
										: 'before:translate-x-[-26px]'
								} ${isTogglerPressed && 'bg-[#2196F3]'}`}></span>
						</label>
					</div>
				</div>
			</div>
			<NavBar />
			<div className="flex max-sm:justify-center">
				<UserButton />
			</div>
		</header>
	);
}
