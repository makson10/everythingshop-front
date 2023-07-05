import { useState, useEffect } from 'react';
import useCookies from '@/hooks/useCookies';

const useIsAdminAuthorized = () => {
	const { getCookies } = useCookies();
	const [isAdminAuthorized, setIsAdminAuthorized] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		setIsLoading(true);

		const adminCookieValue = getCookies('isAdminAuthorized') === 'true';
		setIsAdminAuthorized(adminCookieValue);

		setIsLoading(false);
	}, []);

	return { isAdminAuthorized, isLoading };
};

export default useIsAdminAuthorized;
