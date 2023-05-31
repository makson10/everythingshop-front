export default function LeftTagline() {
	return (
		<div className="pl-[12%] flex flex-col">
			<p
				className="tracking-[1.5px] text-[1.3rem] text-[--first-color]"
				style={{
					fontFamily: 'var(--second-font)',
				}}>
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				The best you've ever seen
			</p>
			<p
				className="text-[3rem] leading-[4rem]"
				style={{ fontFamily: 'var(--second-font)' }}>
				Marketplace
				<br />
				&emsp;&ensp;={'>'} for <b>all</b>
				<br />
				&emsp;&ensp;={'>'} from <b>all</b>
			</p>
		</div>
	);
}
