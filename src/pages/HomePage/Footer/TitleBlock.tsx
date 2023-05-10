import Link from 'next/link';

export default function TitleBlock() {
	return (
		<div className="flex flex-col justify-between items-center">
			<p className="text-[2.3rem] font-['Lato']">Market EVERYTHING</p>
			<div className="flex flex-col items-center gap-[5px] text-[1.2rem]">
				<p className="text-[1.4rem]">
					<small>All what you </small> <b>see</b>
					<small> you can </small>
					<b>buy</b>,
					<br />
					<small>All what you </small>
					<b>have</b>
					<small> you can </small> <b>sell</b>
				</p>
			</div>
			<div className="flex flex-col items-center gap-[10px] text-[1.2rem]">
				<p>
					Not already use this market?{' '}
					<Link
						className="text-[1.4rem] hover:drop-shadow-[0_0_10px_bisque]"
						href="/signUp">
						Sign Up
					</Link>{' '}
					/{' '}
					<Link
						className="text-[1.4rem] hover:drop-shadow-[0_0_10px_bisque]"
						href="/logIn">
						Log In
					</Link>
				</p>
			</div>
		</div>
	);
}
