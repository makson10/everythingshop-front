interface Props {
	price: number;
}

export default function PriceTag({ price }: Props) {
	return (
		<p className="text-sm leading-6 text-gray-900 dark:text-white max-sm:text-center">
			${price}
		</p>
	);
}
