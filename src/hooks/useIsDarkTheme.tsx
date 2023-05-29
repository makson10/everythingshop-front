import { ThemeContext, ThemeUpdateContext } from '@/context/ThemeContext';
import { useContext } from 'react';

export function useIsDarkTheme() {
	return useContext(ThemeContext);
}

export function useIsDarkThemeUpdate() {
	return useContext(ThemeUpdateContext);
}
