export default function TextBlock() {
	return (
		<>
			<div className="pb-4">
				<p
					className="text-[2rem]"
					style={{ fontFamily: 'var(--main-font-weight)' }}>
					About Us
				</p>
				<p
					className="text-[1.2rem]"
					style={{ fontFamily: 'var(--second-font)' }}>
					Our experience wonder
				</p>
			</div>
			<div className="flex flex-row gap-[10px] bg-white w-[500px] max-sm:w-fit">
				<div className="w-[20px] h-full bg-[wheat]"></div>
				<div className="p-4 max-sm:break-words">
					<p className="text-[1.2rem]">
						We have around 25 years experience in this business. Our employee
						are professional workers, who can help you with your issues whenever
					</p>
				</div>
			</div>
		</>
	);
}
