import useDeviceDetect from '@/hooks/useDeviceDetect';
import Link from 'next/link';

export default function TitlePart() {
	const isMobileDevice = useDeviceDetect();

	return (
		<div className="flex flex-col justify-between items-center max-sm:order-1 max-sm:gap-3">
			<p className="text-[2.3rem] max-sm:text-[1.8rem] max-sm:text-center">
				<b>Market EVERYTHING</b>
			</p>
			<div className="flex flex-col items-center gap-[5px]">
				<p className="text-[1.4rem] max-sm:text-[1.3rem]">
					<small>All what you </small> <b>see</b>
					<small> you can </small>
					<b>buy</b>,
					<br />
					<small>All what you </small>
					<b>have</b>
					<small> you can </small> <b>sell</b>
				</p>
			</div>
			<div className="flex flex-col items-center gap-[10px] text-[1.2rem] max-sm:text-[1.1rem]">
				<p className="text-center">
					Still don&apos;t already have an account? {isMobileDevice && <br />}
					<Link
						className="text-[1.4rem] hover:drop-shadow-[0_0_10px_bisque] max-sm:text-[1rem] max-sm:text-[#8cb8ff]"
						href="/signUp">
						Sign Up
					</Link>{' '}
					/{' '}
					<Link
						className="text-[1.4rem] hover:drop-shadow-[0_0_10px_bisque] max-sm:text-[1rem] max-sm:text-[#8cb8ff]"
						href="/logIn">
						Log In
					</Link>
				</p>
			</div>
		</div>
	);
}
