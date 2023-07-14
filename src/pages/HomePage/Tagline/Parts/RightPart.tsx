export default function RightPart() {
	return (
		<div className="pr-[10%] flex flex-row gap-[10px] max-sm:pr-3 max-sm:px-4">
			<p className="flex items-center text-right text-[2rem] leading-[3.4rem] font-sans max-sm:text-[1.2rem] max-sm:leading-[2rem]">
				Here you can buy what
				<br />
				when
				<br />
				where
				<br />
				by price
			</p>
			<p className="flex items-center text-[10rem] max-sm:text-[7rem] max-sm:pb-[0.4rem]">
				{'}'}
			</p>
			<p className="flex flex-col justify-center relative text-[2rem] font-sans max-sm:text-[1.6rem]">
				you want
			</p>
		</div>
	);
}
