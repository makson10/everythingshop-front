interface Props {
	handleDeleteThisProduct: () => void;
}

export default function RemoveButton({ handleDeleteThisProduct }: Props) {
	return (
		<div className="flex">
			<button
				onClick={handleDeleteThisProduct}
				type="button"
				className="font-medium text-indigo-600 hover:text-indigo-500">
				Remove
			</button>
		</div>
	);
}
