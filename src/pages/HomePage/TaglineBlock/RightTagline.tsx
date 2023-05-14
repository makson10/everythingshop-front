export default function RightTagline() {
	return (
		<div className="pr-[10%] flex flex-row gap-[10px]">
			<p
				className="flex items-center text-right text-[2rem] leading-[3.4rem]"
				style={{ fontFamily: 'var(--second-font)' }}>
				Here you can buy what
				<br />
				when
				<br />
				where
				<br />
				by price
			</p>
			<p className="flex items-center text-[10rem]">{'}'}</p>
			<p
				className="flex flex-col justify-center font-sans relative text-[2rem]"
				style={{ fontFamily: 'var(--second-font)' }}>
				you want
			</p>
		</div>
	);
}
