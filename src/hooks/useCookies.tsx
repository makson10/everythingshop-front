import Cookies from 'js-cookie';

const useCookies = () => {
	const getCookies = (cookieName: string) => {
		return Cookies.get(cookieName);
	};

	const setCookies = (
		cookieName: string,
		cookieValue: string,
		options?: object
	) => {
		Cookies.set(cookieName, cookieValue, options);
	};

	const removeCookies = (cookieName: string) => {
		Cookies.remove(cookieName);
	};

	return {
		getCookies,
		setCookies,
		removeCookies,
	};
};

export default useCookies;
