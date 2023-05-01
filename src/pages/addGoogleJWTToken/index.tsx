import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function AddGoogleJWTToken() {
	const router = useRouter();

	useEffect(() => {
		console.log(router.query);
		const googleJWTToken = router.query.setGoogleJWTToken;

		if (googleJWTToken) {
			if (localStorage.getItem('jwtToken')) localStorage.removeItem('jwtToken');
			if (typeof googleJWTToken === 'string')
				localStorage.setItem('googleJWTToken', googleJWTToken);

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
