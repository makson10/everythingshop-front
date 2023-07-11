import Image from 'next/image';

export default function PhotoPart() {
	return (
		<div className="flex justify-center items-center max-sm:hidden">
			<Image
				className="rounded-[30px] w-9/12 h-9/12"
				src="https://media.cntraveller.com/photos/6336d0b8d68dee18a8b96f0f/4:3/w_4160,h_3120,c_limit/La%20Samaritaine%20-2JHH8CK.jpeg"
				alt="#"
				width={1000}
				height={100}
			/>
		</div>
	);
}
