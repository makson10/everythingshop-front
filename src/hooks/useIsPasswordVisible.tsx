import { useState } from 'react';

const useIsPasswordVisible = (initialValue: boolean) => {
	const [isPasswordVisible, setIsPasswordVisible] =
		useState<boolean>(initialValue);

	const togglePasswordVisible = () => {
		setIsPasswordVisible((prevValue) => !prevValue);
	};

	return { isPasswordVisible, togglePasswordVisible };
};

export default useIsPasswordVisible;
