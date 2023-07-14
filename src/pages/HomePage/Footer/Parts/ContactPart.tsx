import Link from 'next/link';
import ContactRow from '@/components/ContactRow/ContactRow';

export default function ContactPart() {
	return (
		<div className="flex flex-col gap-[50px] w-1/4 max-sm:order-3 max-sm:w-[85vw] max-sm:gap-8">
			<div className="flex flex-row gap-4 text-[2.2rem] max-sm:text-[1.8rem]">
				<div className="w-[4px] bg-[#eae7b1]"></div>
				<p>CONTACTS</p>
			</div>
			<div className="flex flex-col items-start gap-5 max-sm:items-center">
				<ContactRow iconUrl="https://img.icons8.com/ios-filled/100/ffffff/phone.png">
					Call +10 200 3030
				</ContactRow>

				<ContactRow iconUrl="https://img.icons8.com/ios-filled/100/ffffff/filled-message.png">
					<Link
						className="break-all hover:underline"
						href="mailto:everything@everythingshop.com">
						everything@everythingshop.com
					</Link>
				</ContactRow>

				<ContactRow iconUrl="https://img.icons8.com/ios/100/ffffff/order-delivered.png">
					<Link className="hover:underline" href="/feedback">
						Leave your beautiful feedback
					</Link>
				</ContactRow>
			</div>
		</div>
	);
}
