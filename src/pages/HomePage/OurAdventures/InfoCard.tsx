import Image from 'next/image';

interface Props {
	data: {
		titleText: string;
		bodyText: string;
		photoUrl: string;
	};
}

export default function InfoCard({ data }: Props) {
	return (
		<div className="flex flex-col items-center gap-[20px]">
			<Image
				className="w-[330px] h-[230px]"
				src={data.photoUrl}
				alt="#"
				width={400}
				height={300}
			/>
			<div className="flex flex-col gap-4 w-[330px]">
				<p className="text-[1.8rem]">{data.titleText}</p>
				<p className="text-[1.2rem] font-[400]">{data.bodyText}</p>
			</div>
		</div>
	);
}
