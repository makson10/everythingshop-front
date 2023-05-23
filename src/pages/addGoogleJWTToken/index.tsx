import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getCookie } from '@/functions/cookiesFunction';
import { useSendEmail } from '@/hooks/useSendEmail';

export default function AddGoogleJWTToken() {
	const router = useRouter();
	const { sendSignUpEmail } = useSendEmail();

	useEffect(() => {
		const googleJWTToken = router.query.setGoogleJWTToken;
		const userEmail = router.query.userEmail;
		const userName = router.query.userName;

		if (!googleJWTToken) return;

		if (getCookie('jwtToken')) document.cookie = `jwtToken=; max-age=0`;
		if (typeof googleJWTToken === 'string') {
			document.cookie = `googleJWTToken=${googleJWTToken}; path=/; samesite=lax;`;
		}

		if (
			userEmail &&
			typeof userEmail === 'string' &&
			userName &&
			typeof userName === 'string'
		) {
			sendSignUpEmail(userEmail, { userName: userName });
		}

		router.replace('/');
	}, []);

	return <div>Loading...</div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {},
	};
};
