import OptionSection from './OptionSection/OptionSection';
import styles from './Header.module.scss';

export default function Header() {
	return (
		<header id={styles['header']}>
			<p id={styles['header-title']}>
				<small>MarketPlace</small> <strong>EVERYTHING</strong>
			</p>
			<OptionSection />
		</header>
	);
}
