import Image from 'next/image';

export default function ReviewSection() {
	return (
		<div className="flex flex-col gap-[30px]">
			<div>
				<p className="text-[2rem] font-sans">Our review</p>
				<p className="text-[1.3rem]">Find out what people think about us</p>
			</div>
			<div className="flex flex-row gap-[20px] max-sm:flex-col">
				<Image
					className="w-[300px] h-[400px] rounded-[30px]"
					src="https://i.pinimg.com/736x/b5/c7/64/b5c76413ca8dd6ee959c30fc370b93a0.jpg"
					alt="#"
					width={300}
					height={400}
				/>
				<div className="pt-1/5 flex flex-col justify-between max-sm:flex-col max-sm:items-end">
					<p className="w-[75%] text-right text-[1.2rem]">
						{/* eslint-disable-next-line react/no-unescaped-entities */}
                        "
						<i>
							In this company all is good, when there is good, and all is bad,
							when... never
						</i>
						{/* eslint-disable-next-line react/no-unescaped-entities */}
                        "
					</p>
					<div className="w-full">
						<p className="text-[1.5rem] font-sans">Louis Kohler</p>
						<p className="text-[1.1rem] font-sans">
							Customer Functionality Developer
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
