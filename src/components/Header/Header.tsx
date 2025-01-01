import GoBackButton from './GoBackButton';
import PageTitle from './PageTitle';
import CartButton from './CartButton';

interface Props {
	pageName: string;
	showCartIcon?: boolean;
}

export default function Header({ pageName, showCartIcon = true }: Props) {
	return (
		<div className="flex flex-col">
			<div className="flex flex-row justify-between p-4 px-8">
				<GoBackButton />
				<PageTitle pageTitle={pageName} />
				<div className="flex justify-center items-center">
					{showCartIcon && <CartButton />}
				</div>
			</div>
			<div className="bg-[darkblue] dark:bg-[orange] w-full h-[5px]"></div>
		</div>
	);
}
