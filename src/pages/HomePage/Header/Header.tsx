import OptionSection from './OptionSection/OptionSection';
import UserIcon from './UserIcon/UserIcon';
import styles from './Header.module.css';

export default function Header() {
	return (
		<header id={styles['header']} className="max-sm:gap-6">
			<div className="flex items-center w-2/12 max-sm:hidden">
				<img src="./everythingshop_logo_dark.png" />
			</div>
			<OptionSection />
			<div
				id={styles['header-sign-button-wrapper']}
				className="flex max-sm:justify-center">
				<UserIcon />
			</div>
		</header>
	);
}
