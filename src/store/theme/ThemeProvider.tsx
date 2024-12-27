import { PropsWithChildren, useEffect } from 'react';
import { changeTheme, observeClassChanges } from './themeUtils';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setCurrentTheme } from './themeSlice';

const ThemeProvider = ({ children }: PropsWithChildren) => {
	const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);
	const dispatch = useAppDispatch();

	useEffect(() => {
		observeClassChanges();
		dispatch(setCurrentTheme());
	}, []);

	useEffect(() => {
		changeTheme(isDarkTheme);
	}, [isDarkTheme]);

	return <>{children}</>;
};

export default ThemeProvider;
