import { useState, useEffect } from 'react';
import useCookies from '@/hooks/useCookies';

const useIsAdminLogIn = () => {
	const { getCookies } = useCookies();
	const [isAdminLogIn, setIsAdminLogIn] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		setIsLoading(true);

		const isAdminAuthorized = getCookies('isAdminAuthorized') === 'true';
		setIsAdminLogIn(isAdminAuthorized);

		setIsLoading(false);
	}, []);

	return { isAdminLogIn, isLoading };
};

export default useIsAdminLogIn;
