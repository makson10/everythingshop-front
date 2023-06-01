import Link from 'next/link';

export default function NavBar() {
	return (
		<div className="flex flex-row gap-[10px] h-[50px] max-sm:order-1 max-sm:justify-center">
			<div className="flex items-center py-4">
				<ul className="flex flex-row gap-[30px]">
					<li>
						<Link
							href={'/addProduct'}
							className="font-[600] text-black dark:text-white relative inline-flex before:absolute before:top-full before:bg-[darkblue] dark:before:bg-[orange] before:w-full before:h-[4px] before:scale-x-0 before:ease-linear before:duration-100 before:transition-[transform] hover:before:scale-x-100">
							Add item
						</Link>
					</li>
					<li>
						<Link
							href={'/assortment'}
							className="font-[600] text-black dark:text-white relative inline-flex before:absolute before:top-full before:bg-[darkblue] dark:before:bg-[orange] before:w-full before:h-[4px] before:scale-x-0 before:ease-linear before:duration-100 before:transition-[transform] hover:before:scale-x-100">
							Assortment
						</Link>
					</li>
					<li>
						<Link
							href={'/cart'}
							className="font-[600] text-black dark:text-white relative inline-flex before:absolute before:top-full before:bg-[darkblue] dark:before:bg-[orange] before:w-full before:h-[4px] before:scale-x-0 before:ease-linear before:duration-100 before:transition-[transform] hover:before:scale-x-100">
							Cart
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
