import { createContext, useEffect, useState, ReactNode } from 'react';
import { ThemeContextType, ThemeUpdateContextType } from '@/types/contextTypes';

interface ProviderProps {
	children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType>(false);
export const ThemeUpdateContext = createContext<ThemeUpdateContextType>({
	toggleIsDarkTheme: () => {},
});

export function ThemeProvider({ children }: ProviderProps) {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

	const toggleIsDarkTheme = () => {
		setIsDarkTheme((prevValue) => !prevValue);
	};

	useEffect(() => {
		const storedIsDarkTheme = localStorage.getItem('isDarkTheme');
		storedIsDarkTheme
			? setIsDarkTheme(storedIsDarkTheme === 'true')
			: setIsDarkTheme(document.documentElement.classList.contains('dark'));
	}, []);

	useEffect(() => {
		const callback = (mutationList: any) => {
			mutationList.forEach((mutation: any) => {
				if (
					mutation.type !== 'attributes' ||
					mutation.attributeName !== 'class'
				) {
					return;
				}

				const elementClassList = mutation.target.classList.values();
				for (const value of elementClassList) {
					setIsDarkTheme(() => {
						const newValue = value === 'dark';
						localStorage.setItem('isDarkTheme', `${newValue}`);
						return newValue;
					});
				}
			});
		};

		setTimeout(() => {
			const observer = new MutationObserver(callback);
			observer.observe(document.documentElement, { attributes: true });
		}, 1000);
	}, []);

	useEffect(() => {
		const documentClassList = document.documentElement.classList;
		isDarkTheme
			? documentClassList.add('dark')
			: documentClassList.remove('dark');
	}, [isDarkTheme]);

	return (
		<ThemeContext.Provider value={isDarkTheme}>
			<ThemeUpdateContext.Provider
				value={{
					toggleIsDarkTheme,
				}}>
				{children}
			</ThemeUpdateContext.Provider>
		</ThemeContext.Provider>
	);
}
