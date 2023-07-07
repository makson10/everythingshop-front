interface Props {
	productDescription: string;
}

export default function Details({ productDescription }: Props) {
	return (
		<>
			{/* Description and details */}
			<div className="flex flex-col gap-2">
				<h3 className="sr-only">Description</h3>

				<h3 className="text-xl font-bold">Description</h3>
				<div className="space-y-6">
					<p className="text-base text-gray-900 break-words dark:text-white">
						{productDescription}
					</p>
				</div>
			</div>
		</>
	);
}
