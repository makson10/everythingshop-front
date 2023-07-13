export default function HoursPart() {
	return (
		<div className="flex flex-col gap-[3rem] w-1/4 max-sm:order-2 max-sm:w-[85vw] max-sm:gap-8">
			<div className="flex flex-row gap-4 text-[1.8rem] max-sm:text-[1.8rem]">
				<div className="w-[4px] bg-[--second-color]"></div>
				<p>OPENING HOURS</p>
			</div>
			<div className="flex flex-col gap-[20px] text-[1.4rem] max-sm:text-[1.1rem]">
				<div className="flex flex-row gap-[30px] w-full justify-between">
					<p>Real shop</p>
					<p className="text-[--second-color] text-right">we haven't it)</p>
				</div>
				<div className="flex flex-row gap-[30px] w-full justify-between">
					<p>Support service</p>
					<p className="text-[--second-color] text-right">24/7</p>
				</div>
				<div className="flex flex-row gap-[30px] w-full justify-between">
					<p>Author of this site</p>
					<p className="text-[--second-color] text-right">
						always want nutella
					</p>
				</div>
			</div>
		</div>
	);
}
