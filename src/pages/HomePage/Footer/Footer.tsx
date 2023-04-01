import ContactBlock from './ContactBlock/ContactBlock';
import HoursBlock from './HoursBlock/HoursBlock';
import TitleBlock from './TitleBlock/TitleBlock';
import styles from './Footer.module.scss';

export default function Footer() {
	return (
		<footer className={styles['footer']}>
            <ContactBlock />
			<TitleBlock />
			<HoursBlock />
		</footer>
	);
}
