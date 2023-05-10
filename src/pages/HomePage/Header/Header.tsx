import OptionSection from './OptionSection/OptionSection';
import UserIcon from './UserIcon/UserIcon';
import styles from './Header.module.scss';

export default function Header() {
	return (
		<header id={styles['header']}>
			<div className="flex items-center w-2/12">
				<img src="./everythingshop_logo_dark.png" />
			</div>
			<OptionSection />
			<div id={styles['header-sign-button-wrapper']}>
				<UserIcon />
			</div>
		</header>
	);
}
