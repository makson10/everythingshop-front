import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import useSendEmail from '@/hooks/useSendEmail';
import useCookies from '@/hooks/useCookies';

export default function AddGoogleJWTToken() {
	const router = useRouter();
	const { sendSignUpEmail } = useSendEmail();
	const { getCookies, setCookies, removeCookies } = useCookies();

	useEffect(() => {
		const googleJWTToken = router.query.setGoogleJWTToken;
		const userEmail = router.query.userEmail;
		const userName = router.query.userName;

		if (!googleJWTToken) return;

		if (getCookies('jwtToken')) removeCookies('jwtToken');
		if (typeof googleJWTToken === 'string') {
			setCookies('googleJWTToken', googleJWTToken, {
				sameSite: 'Lax',
			});
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
