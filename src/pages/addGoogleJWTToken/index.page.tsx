import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSendEmail from '@/hooks/useSendEmail';
import Cookies from 'js-cookie';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import axios from 'axios';
import { IUnionUserData } from '@/types/userTypes';
import { useAppDispatch } from '@/store/hooks';
import { saveData } from '@/store/user/userSlice';

export default function AddGoogleJWTToken({ user }: { user: IUnionUserData }) {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { sendSignUpEmail } = useSendEmail();

	const deleteOldTokenAndSetUpNew = (googleToken: string) => {
		Cookies.remove('token');

		Cookies.set('googleToken', googleToken, {
			sameSite: 'Lax',
		});
	};

	useEffect(() => {
		const token = router.query.googletoken;
		const name = router.query.name;
		const email = router.query.email;

		if (typeof token === 'string') {
			deleteOldTokenAndSetUpNew(token);
			dispatch(saveData(user));
		}

		if (typeof name === 'string' && typeof email === 'string') {
			sendSignUpEmail(email, { userName: name });
		}

		router.replace('/');
	}, [router.query]);

	return <LoadingScreen />;
}

export const getServerSideProps = async (context: any) => {
	const token = context.query.googletoken;

	const user = await axios
		.post(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/googleCustomers/verify`,
			{ token }
		)
		.then((res) => res.data);

	return {
		props: { user },
	};
};
