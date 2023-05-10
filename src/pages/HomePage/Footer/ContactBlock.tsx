export default function ContactBlock() {
	return (
		<div className="flex flex-col gap-[50px] w-1/4">
			<div className="flex flex-row gap-4">
				<div className="w-[4px] bg-[#eae7b1]"></div>
				<p className="text-[2.2rem]">CONTACTS</p>
			</div>

			<div className="flex flex-col items-start gap-4">
				<div className="flex flex-row justify-center items-center gap-2.5">
					<img src="phone-icon.png" />
					<p>+1 200 3030</p>
				</div>
				<div className="flex flex-row justify-center items-center gap-2.5">
					<img src="email-icon.png" />
					<p>everything@everythingshop.com</p>
				</div>
				<div className="flex flex-row justify-center items-center gap-2.5">
					<img src="address-icon.png" />
					<p>
						<a href="/feedback">Write your feedback</a>
					</p>
				</div>
			</div>
		</div>
	);
}
