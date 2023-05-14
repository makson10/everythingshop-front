import { useRouter } from 'next/router';
import { useUserDataUpdate } from '@/pages/context/UserDataContext';

export default function UserAlreadyAuthorizedPage() {
	const { deleteData, deleteTokens } = useUserDataUpdate();
	const router = useRouter();

	const handleClick = () => {
		deleteData();
		deleteTokens();
		router.reload();
	};

	return (
		<div className="h-screen flex justify-center items-center">
			<div className="w-fit px-[5rem] py-[3rem] flex flex-col justify-center items-center gap-[30px] bg-white rounded-[30px]">
				<h1>You are already authorized</h1>
				<button
					className="bg-[coral] p-[0.6rem] rounded-[8px] text-white text-[1.2rem] font-bold transition-all ease-in diraction-150 hover:scale-[1.2]"
					onClick={handleClick}>
					Log Out
				</button>
			</div>
		</div>
	);
}
