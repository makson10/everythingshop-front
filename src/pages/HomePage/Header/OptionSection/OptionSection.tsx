import Link from 'next/link';
import styles from './OptionSection.module.scss';

export default function OptionSection() {
	return (
		<div id={styles['header-menu']} className='max-sm:order-1'>
			<div id={styles['header-link-menu']}>
				<ul id={styles['header-link-ul']}>
					<li>
						<Link href={'/addProduct'}>Add item</Link>
					</li>
					<li>
						<Link href={'/assortment'}>Assortment</Link>
					</li>
					<li>
						<Link href={'/cart'}>Cart</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
