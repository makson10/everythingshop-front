import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import useSendEmail from '@/hooks/useSendEmail';
import useCookies from '@/hooks/useCookies';

export default function AddGoogleJWTToken() {
	const router = useRouter();
	const { sendSignUpEmail } = useSendEmail();
	const { getCookies, setCookies, removeCookies } = useCookies();

	const deleteOldTokenAndSetUpNew = (googleJWTToken: string) => {
		if (getCookies('jwtToken')) removeCookies('jwtToken');
		setCookies('googleJWTToken', googleJWTToken, {
			sameSite: 'Lax',
		});
	};

	useEffect(() => {
		const googleJWTToken = router.query.googleJWTToken;
		const userEmail = router.query.userEmail;
		const userName = router.query.userName;

		if (typeof googleJWTToken === 'string') {
			deleteOldTokenAndSetUpNew(googleJWTToken);
		}

		if (
			userEmail &&
			userName &&
			typeof userEmail === 'string' &&
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
