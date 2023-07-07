import Inscription from './Inscription';

export default function NavBar() {
	return (
		<div className="flex flex-row gap-[10px] h-[50px] max-sm:order-1 max-sm:justify-center">
			<div className="flex items-center py-4">
				<ul className="flex flex-row gap-[30px]">
					<li>
						<Inscription title="Add item" urlToRedirect="/addProduct" />
					</li>
					<li>
						<Inscription title="Assortment" urlToRedirect="/assortment" />
					</li>
					<li>
						<Inscription title="Cart" urlToRedirect="/cart" />
					</li>
				</ul>
			</div>
		</div>
	);
}
