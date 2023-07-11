import Image from 'next/image';

export default function Logo({ isDarkTheme }: { isDarkTheme: boolean }) {
	return (
		<Image
			src={
				isDarkTheme
					? '/everythingshop_logo.png'
					: '/everythingshop_logo_dark.png'
			}
			alt="#"
			width={185}
			height={50}
		/>
	);
}
