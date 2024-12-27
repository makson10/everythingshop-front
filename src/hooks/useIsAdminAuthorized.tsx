import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useIsAdminAuthorized = () => {
	const [isAdminAuthorized, setIsAdminAuthorized] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		setIsLoading(true);

		const adminCookieValue = Cookies.get('isAdminAuthorized') === 'true';
		setIsAdminAuthorized(adminCookieValue);

		setIsLoading(false);
	}, []);

	return { isAdminAuthorized, isLoading };
};

export default useIsAdminAuthorized;
