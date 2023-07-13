import Image from 'next/image';
import { useUserData } from '@/hooks/useUserDataContext';
import { useDarkTheme } from '@/hooks/useDarkTheme';

interface Props {
	userName: string;
	handleToggleIsOpenMenu: () => void;
}

export default function UserBadge({ userName, handleToggleIsOpenMenu }: Props) {
	const userData = useUserData();
	const isDarkTheme = useDarkTheme();

	return (
		<div
			className="flex justify-around items-center gap-[10px] w-[160px] px-[12px] text-black dark:text-white"
			onClick={handleToggleIsOpenMenu}>
			<button>
				<Image
					className="min-w-12 max-w-[3rem] rounded-xl"
					src={
						userData.data?.picture
							? userData.data?.picture
							: `https://img.icons8.com/windows/120/${
									isDarkTheme ? 'ffffff' : '000000'
							  }/user-male-circle.png`
					}
					alt="#"
					width={100}
					height={100}
				/>
			</button>
			<p className="font-[600] cursor-pointer break-words">{userName}</p>
		</div>
	);
}
