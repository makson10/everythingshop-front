import { useRouter } from 'next/router';
import { useUpdateUserData } from '@/hooks/useUserDataContext';

export default function UserAlreadyAuthorizedPage() {
	const { logOut } = useUpdateUserData();
	const router = useRouter();

	const handleLogOut = () => {
		logOut();
		router.reload();
	};

	return (
		<div className="h-full flex justify-center items-center gap-6 max-sm:px-8">
			<div className="flex flex-col gap-4 bg-[bisque] border-[1px] border-black rounded-[1rem] p-[1.8rem]">
				<p className="text-[2rem] text-black font-sans max-sm:text-[1.7rem] max-sm:text-center">
					You are already authorized
				</p>
				<div className="flex justify-center bg-[coral] p-[0.6rem] rounded-[8px]">
					<button
						className="text-white text-[1.2rem] focus-visible:outline-0"
						onClick={handleLogOut}>
						Log Out
					</button>
				</div>
			</div>
		</div>
	);
}
