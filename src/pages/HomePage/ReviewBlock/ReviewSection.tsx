export default function ReviewSection() {
	return (
		<div className="flex flex-col gap-[30px]">
			<div>
				<p className="text-[2rem]" style={{ fontFamily: 'var(--second-font)' }}>
					Our review
				</p>
				<p className="text-[1.3rem]">Find out what people think about us</p>
			</div>
			<div className="flex flex-row gap-[20px] max-sm:flex-col">
				<img
					className="w-[300px] h-[400px] rounded-[30px]"
					src="https://i.pinimg.com/736x/b5/c7/64/b5c76413ca8dd6ee959c30fc370b93a0.jpg"
				/>
				<div className="pt-1/5 flex flex-col justify-between max-sm:flex-col max-sm:items-end">
					<p className="w-[50%] text-right text-[1.2rem]">
						"
						<i>
							In this company all is good, when there is good, and all is bad,
							when... never
						</i>
						"
					</p>
					<div className="w-full">
						<p
							className="text-[1.5rem]"
							style={{ fontFamily: 'var(--second-font)' }}>
							Louis Kohler
						</p>
						<p
							className="text-[1.1rem]"
							style={{ fontWeight: 'var(--second-font-weight)' }}>
							Customer Functionality Developer
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
