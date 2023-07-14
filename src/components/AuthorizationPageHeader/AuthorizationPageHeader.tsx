import Image from 'next/image';
import { useDarkTheme } from '@/hooks/useDarkTheme';

interface Props {
	pageTitle: string;
}

export default function AuthorizationPageHeader({ pageTitle }: Props) {
	const isDarkTheme = useDarkTheme();

	return (
		<div className="sm:mx-auto sm:w-full sm:max-w-sm">
			<Image
				className="mx-auto h-10 w-auto"
				src={
					isDarkTheme
						? '/everythingshop_logo.png'
						: '/everythingshop_logo_dark.png'
				}
				width={400}
				height={400}
				alt="My Company"
			/>
			<h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
				{pageTitle}
			</h2>
		</div>
	);
}
