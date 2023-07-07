import { ThemeContext, UpdateThemeContext } from '@/context/ThemeContext';
import { useContext } from 'react';

export function useDarkTheme() {
	return useContext(ThemeContext);
}

export function useUpdateDarkTheme() {
	return useContext(UpdateThemeContext);
}
