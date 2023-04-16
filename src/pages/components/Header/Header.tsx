import React from 'react';
import { useRouter } from 'next/router';
import styles from './Header.module.scss';

interface Props {
	pageName: string | string[] | undefined;
	showCartIcon?: boolean;
}

export default function Header({
	pageName,
	showCartIcon = true,
}: Props) {
	const router = useRouter();

	return (
		<div id={styles['header-wrapper']}>
			<div id={styles['header-content']}>
				<div id={styles['main-content']}>
					<button
						id={styles['back-button']}
						onClick={() => router.back()}>
						<img
							id={styles['back-button-icon']}
							src={'https://img.icons8.com/ios/100/null/circled-left-2.png'}
						/>
					</button>
					<p id={styles['page-title']}>{pageName}</p>
				</div>
				{showCartIcon && (
					<div id={styles['cart-button-wrapper']}>
						<button
							id={styles['cart-button']}
							onClick={() => router.push('/cart')}>
							<img src="https://img.icons8.com/sf-black/48/null/buy.png" />
						</button>
					</div>
				)}
			</div>
			<div id={styles['header-split-line']}></div>
		</div>
	);
}
