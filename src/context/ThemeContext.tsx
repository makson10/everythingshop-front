import { createContext, useEffect, useState, ReactNode } from 'react';
import { ThemeContextType, UpdateThemeContextType } from '@/types/contextTypes';

interface ProviderProps {
	children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType>(false);
export const UpdateThemeContext = createContext<UpdateThemeContextType>({
	toggleIsDarkTheme: () => {},
});

export function ThemeProvider({ children }: ProviderProps) {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

	const toggleIsDarkTheme = () => {
		setIsDarkTheme((prevValue) => !prevValue);
	};

	useEffect(() => {
		const callback = (mutationList: any) => {
			mutationList.forEach((mutation: any) => {
				if (
					mutation.type !== 'attributes' ||
					mutation.attributeName !== 'class'
				) {
					return;
				}
				const mutationClassList = mutation.target.classList.values();

				let isDarkClassExists = false;
				for (const value of mutationClassList) {
					if (value === 'dark') isDarkClassExists = true;
				}

				localStorage.setItem('isDarkTheme', `${isDarkClassExists}`);
			});
		};

		setTimeout(() => {
			const observer = new MutationObserver(callback);
			observer.observe(document.documentElement, { attributes: true });
		}, 1000);
	}, []);

	useEffect(() => {
		const darkThemeCookieValue = localStorage.getItem('isDarkTheme');
		setIsDarkTheme(darkThemeCookieValue === 'true');
	}, []);

	useEffect(() => {
		const documentClassList = document.documentElement.classList;
		isDarkTheme
			? documentClassList.add('dark')
			: documentClassList.remove('dark');
	}, [isDarkTheme]);

	return (
		<ThemeContext.Provider value={isDarkTheme}>
			<UpdateThemeContext.Provider
				value={{
					toggleIsDarkTheme,
				}}>
				{children}
			</UpdateThemeContext.Provider>
		</ThemeContext.Provider>
	);
}
