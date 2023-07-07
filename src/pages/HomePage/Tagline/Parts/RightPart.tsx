export default function RightPart() {
	return (
		<div className="pr-[10%] flex flex-row gap-[10px]">
			<p className="flex items-center text-right text-[2rem] leading-[3.4rem] font-sans">
				Here you can buy what
				<br />
				when
				<br />
				where
				<br />
				by price
			</p>
			<p className="flex items-center text-[10rem]">{'}'}</p>
			<p className="flex flex-col justify-center relative text-[2rem] font-sans">
				you want
			</p>
		</div>
	);
}
