import Image from 'next/image';

export default function PhotoBlock() {
	return (
		<div className="flex justify-center items-center max-sm:hidden">
			<Image
				className="rounded-[30px] w-9/12 h-9/12"
				src="https://www.retailgazette.co.uk/wp-content/uploads/Shopping-centre_Hammerson_generic_PA-1.jpg"
				alt="#"
				width={1000}
				height={100}
			/>
		</div>
	);
}
