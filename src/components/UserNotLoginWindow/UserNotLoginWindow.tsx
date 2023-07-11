import Link from 'next/link';

export default function UserNotLoginWindow() {
	return (
		<div className="flex-[2_1_auto] flex justify-center items-center gap-6">
			<div className="flex flex-col gap-4 bg-[bisque] border-[1px] border-black rounded-[1rem] p-[1.8rem]">
				<p className="text-[2rem] text-black font-sans max-sm:text-[1.7rem] max-sm:text-center">
					You haven't login yet
				</p>
				<div className="flex justify-center bg-[coral] p-[0.6rem] rounded-[8px]">
					<Link
						href={'/logIn'}
						className="text-white text-[1.2rem] focus-visible:outline-0">
						Log in
					</Link>
				</div>
			</div>
		</div>
	);
}
