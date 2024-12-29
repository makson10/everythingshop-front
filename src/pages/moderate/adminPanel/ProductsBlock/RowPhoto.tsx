import Image from 'next/image';

interface Props {
	photoId: string;
}

export default function RowPhoto({ photoId }: Props) {
	const defaultProductPhoto =
		'https://img.icons8.com/ios/50/000000/product--v1.png';

	return (
		<Image
			className="w-[50px] h-[50px] rounded object-cover"
			src={photoId || defaultProductPhoto}
			alt="#"
			width={100}
			height={100}
		/>
	);
}
