export default function HoursBlock() {
	return (
		<div className="flex flex-col gap-[50px] w-1/4">
			<div className="flex flex-row gap-4 text-[2.2rem]">
				<div className="w-[4px] bg-[#eae7b1]"></div>
				<div>OPENING HOURS</div>
			</div>
			<div className="flex flex-col gap-[20px] text-[1.4rem]">
				<div className="flex flex-row gap-[30px] w-full justify-between">
					<p>Real shop</p>
					<p className="text-[#eae7b1]">we haven't it)</p>
				</div>
				<div className="flex flex-row gap-[30px] w-full justify-between">
					<p>Support service</p>
					<p className="text-[#eae7b1]">24/7</p>
				</div>
				<div className="flex flex-row gap-[30px] w-full justify-between">
					<p>Author of this site</p>
					<p className="text-[#eae7b1]">always want nutella</p>
				</div>
			</div>
		</div>
	);
}
