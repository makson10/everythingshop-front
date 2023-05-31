import Image from 'next/image';
import Link from 'next/link';

export default function ContactBlock() {
	return (
		<div className="flex flex-col gap-[50px] w-1/4 max-sm:order-3 max-sm:w-[85vw] max-sm:gap-8">
			<div className="flex flex-row gap-4 text-[2.2rem] max-sm:text-[1.8rem]">
				<div className="w-[4px] bg-[#eae7b1]"></div>
				<p>CONTACTS</p>
			</div>
			<div className="flex flex-col items-start gap-4">
				<div className="flex flex-row justify-center items-center gap-2.5">
					<Image
						src="https://img.icons8.com/ios-filled/48/ffffff/phone.png"
						alt="#"
						width={48}
						height={48}
					/>
					<p>+10 200 3030</p>
				</div>
				<div className="flex flex-row justify-center items-center gap-2.5">
					<Image
						src="https://img.icons8.com/ios-filled/48/ffffff/filled-message.png"
						alt="#"
						width={48}
						height={48}
					/>
					<p className="break-all text-center">everything@everythingshop.com</p>
				</div>
				<div className="flex flex-row justify-center items-center gap-2.5">
					<Image
						src="https://img.icons8.com/ios/48/ffffff/order-delivered.png"
						alt="#"
						width={48}
						height={48}
					/>
					<p>
						<Link href="/feedback">Write your feedback</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
