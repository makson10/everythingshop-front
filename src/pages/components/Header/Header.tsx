import { useRouter } from 'next/router';
import { useCartContext } from '@/pages/context/CartContext';
import styles from './Header.module.css';

interface Props {
	pageName: string | string[] | undefined;
	showCartIcon?: boolean;
}

export default function Header({ pageName, showCartIcon = true }: Props) {
	const cart = useCartContext();
	const router = useRouter();

	return (
		<div className="flex flex-col">
			<div className="flex flex-row justify-between p-4 px-8">
				<div className="flex flex-row">
					<button id={styles['back-button']} onClick={() => router.back()}>
						<img
							id={styles['back-button-icon']}
							src={'https://img.icons8.com/ios/100/null/circled-left-2.png'}
						/>
					</button>
				</div>
				<p id={styles['page-title']}>{pageName}</p>
				<div className="flex justify-center items-center">
					{showCartIcon && (
						<>
							<button
								id={styles['cart-button']}
								onClick={() => router.push('/cart')}>
								<img src="https://img.icons8.com/sf-black/48/null/buy.png" />
								{cart.length !== 0 && (
									<div id={styles['cart-product-amount']}>
										<p>{cart.length}</p>
									</div>
								)}
							</button>
						</>
					)}
				</div>
			</div>
			<div className="bg-[darkblue] w-full h-[5px]"></div>
		</div>
	);
}
