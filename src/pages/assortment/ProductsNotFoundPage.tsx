export function ProductsNotFoundPage() {
	return (
		<div className="flex justify-center">
			<div className="flex justify-center items-center w-1/2 max-sm:w-4/5">
				<div className="p-4 bg-white ring-2 ring-black">
					<p className="text-[1.8rem] text-center font-bold">
						We have not found some product with this sort/filter/search
						parameters
					</p>
				</div>
			</div>
		</div>
	);
}
