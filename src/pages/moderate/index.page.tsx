import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useCookies from '@/hooks/useCookies';
import useIsAdminAuthorized from '@/hooks/useIsAdminAuthorized';
import { ShowErrorModalWindow } from '@/components/ShowModalWindow/ShowModalWindow';
import { ShowLoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import AuthorizationForm from './AuthorizationForm';
import { IAdminData } from '@/types/adminTypes';
import axios from 'axios';

export default function ModeratePage() {
	const { setCookies } = useCookies();
	const { isAdminAuthorized, isLoading } = useIsAdminAuthorized();
	const [shouldShowLoadingScreen, setShouldShowLoadingScreen] =
		useState<boolean>();

	const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
	const [isOpenErrorWindow, setIsOpenErrorWindow] = useState<boolean>(false);
	const router = useRouter();

	const handleSubmitForm = async (adminData: IAdminData) => {
		try {
			await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admins/login`,
				adminData
			);
			setAdminCookie();
			redirectUserToAdminPanel();
		} catch (error) {
			setServerErrorMessage('Something went wrong');
			handleFailure();
		}
	};

	const setAdminCookie = () => {
		setCookies('isAdminAuthorized', 'true', {
			path: '/moderate',
			samesite: 'Lax',
			expires: new Date(new Date().getTime() + 5 * 60 * 1000),
		});
	};

	const redirectUserToAdminPanel = () => {
		router.push(`${router.pathname}/adminPanel`);
	};

	const handleFailure = () => {
		setIsOpenErrorWindow(true);

		setTimeout(() => {
			setIsOpenErrorWindow(false);
		}, 3000);
	};

	useEffect(() => {
		if (isAdminAuthorized && !isLoading) router.push('/moderate/adminPanel');
	}, [isAdminAuthorized, isLoading]);

	useEffect(() => {
		setShouldShowLoadingScreen(isLoading);
	}, [isLoading]);

	if (shouldShowLoadingScreen) return <ShowLoadingScreen />;

	return (
		<>
			{isOpenErrorWindow && <ShowErrorModalWindow error={serverErrorMessage} />}

			<div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#3c6255] text-white">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<Image
						className="mx-auto h-10 w-auto"
						src="/everythingshop_logo.png"
						alt="My Company"
						width={400}
						height={400}
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
						Log in to admin account
					</h2>
				</div>
				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
					<AuthorizationForm handleSubmitForm={handleSubmitForm} />
				</div>
			</div>
		</>
	);
}
