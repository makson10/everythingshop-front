import { useRouter } from 'next/router';
import { useCartContext } from '@/hooks/useCartContext';
import { useIsDarkTheme } from '@/hooks/useIsDarkTheme';

interface Props {
	pageName: string | string[] | undefined;
	showCartIcon?: boolean;
}

export default function Header({ pageName, showCartIcon = true }: Props) {
	const isDarkTheme = useIsDarkTheme();
	const cart = useCartContext();
	const router = useRouter();

	return (
		<div className="flex flex-col">
			<div className="flex flex-row justify-between p-4 px-8">
				<div className="flex flex-row">
					<button className="rounded-full" onClick={() => router.back()}>
						<img
							className="w-[60px] h-[60px] max-sm:w-[40px] max-sm:h-[40px]"
							src={`https://img.icons8.com/ios/100/${
								isDarkTheme ? 'ffffff' : '000000'
							}/circled-left-2.png`}
						/>
					</button>
				</div>
				<p className="flex items-center text-[1.8rem] max-sm:text-[1.4rem]">
					{pageName}
				</p>
				<div className="flex justify-center items-center">
					{showCartIcon && (
						<>
							<button
								className="relative w-fit h-fit max-sm:w-[32px] max-sm:h-[32px]"
								onClick={() => router.push('/cart')}>
								<img
									src={`https://img.icons8.com/sf-black/48/${
										isDarkTheme ? 'ffffff' : '000000'
									}/buy.png`}
								/>
								{cart.length !== 0 && (
									<div className="flex justify-center items-center absolute top-[-20%] left-[65%] w-1/2 bg-[coral] rounded-full max-sm:text-[0.8rem] max-sm:h-1/2 max-sm:top-[-15%]">
										<p>{cart.length}</p>
									</div>
								)}
							</button>
						</>
					)}
				</div>
			</div>
			<div className="bg-[darkblue] dark:bg-[orange] w-full h-[5px]"></div>
		</div>
	);
}
