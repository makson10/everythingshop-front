import { useEffect, useState } from "react";

const useIsDarkTheme = () => {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>();

	useEffect(() => {
		setIsDarkTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);

		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', (event) => {
				setIsDarkTheme(event.matches);
			});
	}, []);

    return isDarkTheme;
};

export default useIsDarkTheme;