import Cookies from 'js-cookie';

const useCookies = () => {
	const getCookies = (key: string) => {
		return Cookies.get(key);
	};

	const setCookies = (
		key: string,
		value: string,
		options?: object
	) => {
		Cookies.set(key, value, options);
	};

	const removeCookies = (key: string) => {
		Cookies.remove(key);
	};

	return {
		getCookies,
		setCookies,
		removeCookies,
	};
};

export default useCookies;
