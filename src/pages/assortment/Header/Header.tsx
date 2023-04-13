import React from 'react';
import { useRouter } from 'next/router';
import styles from './Header.module.scss';

interface Props {
	pageName: string | string[] | undefined;
	routeToGoBack: string;
}

export function Header({ pageName, routeToGoBack }: Props) {
	const router = useRouter();

	return (
		<div id={styles['header-wrapper']}>
			<div id={styles['header-content-wrapper']}>
				<button
					id={styles['back-button']}
					onClick={() => router.push(routeToGoBack)}>
					<img
						id={styles['back-button-icon']}
						src={'https://img.icons8.com/ios/100/null/circled-left-2.png'}
					/>
				</button>
				<p id={styles['page-title']}>{pageName}</p>
			</div>
			<div id={styles['header-split-line']}></div>
		</div>
	);
}
