import { useState } from 'react';

const useIsPasswordVisible = (initialValues: boolean) => {
	const [isPasswordVisible, setIsPasswordVisible] =
		useState<boolean>(initialValues);

	const togglePasswordVisible = () => {
		setIsPasswordVisible((prevValue) => !prevValue);
	};

	return { isPasswordVisible, togglePasswordVisible };
};

export default useIsPasswordVisible;
