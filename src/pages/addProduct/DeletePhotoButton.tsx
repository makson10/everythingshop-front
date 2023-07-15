import Image from 'next/image';

interface Props {
	deletePhoto: () => void;
}

export default function DeletePhotoButton({ deletePhoto }: Props) {
	return (
		<div className="absolute top-[0%] right-[8.5%] text-black rounded-full bg-white h-[48px]">
			<button className="relative left-[-3%]" onClick={deletePhoto}>
				<Image
					src="https://img.icons8.com/windows/100/null/trash.png"
					alt="#"
					width={48}
					height={48}
				/>
			</button>
		</div>
	);
}
