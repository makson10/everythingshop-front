import React from 'react';
import Link from 'next/link';
import UserIcon from './UserIcon/UserIcon';
import styles from './OptionSection.module.scss';

export default function OptionSection() {
	return (
		<div id={styles['header-menu']}>
			<div id={styles['header-link-menu']}>
				<ul id={styles['header-link-ul']}>
					<li>
						<Link href={'/addProduct'}>Добавить товар</Link>
					</li>
					<li>
						<Link href={'/assortment'}>Ассортимент</Link>
					</li>
				</ul>
			</div>
			<div id={styles['header-sign-button-wrapper']}>
				<UserIcon />
			</div>
		</div>
	);
}
