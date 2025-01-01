import Image from 'next/image';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';

const GoBackButton = () => {
	const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);
	const router = useRouter();

	return (
		<div className="flex flex-row">
			<button className="rounded-full" onClick={() => router.back()}>
				<Image
					className="w-[60px] h-[60px] max-sm:w-[40px] max-sm:h-[40px]"
					src={`https://img.icons8.com/ios/100/${
						isDarkTheme ? 'ffffff' : '000000'
					}/circled-left-2.png`}
					alt="#"
					width={100}
					height={100}
				/>
			</button>
		</div>
	);
};

export default GoBackButton;
