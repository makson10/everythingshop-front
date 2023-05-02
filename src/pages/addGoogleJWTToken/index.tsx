import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getCookie } from '../functions/cookiesFunction';

export default function AddGoogleJWTToken() {
	const router = useRouter();

	useEffect(() => {
		console.log(router.query);
		const googleJWTToken = router.query.setGoogleJWTToken;

		if (googleJWTToken) {
			if (getCookie('jwtToken')) document.cookie = `jwtToken=; max-age=0`;
			if (typeof googleJWTToken === 'string') {
				document.cookie = `googleJWTToken=${googleJWTToken}; path=/; samesite=lax;`;
			}

			router.replace('/');
		}
	}, []);

	return <div>Loading...</div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {},
	};
};
