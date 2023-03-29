import FooterContactBlock from './FooterContactBlock/FooterContactBlock';
import FooterHoursBlock from './FooterHoursBlock/FooterHoursBlock';
import FooterTitleBlock from './FooterTitleBlock/FooterTitleBlock';
import './Footer.scss';

export default function Footer() {
	return (
		<footer>
            <FooterContactBlock />
			<FooterTitleBlock />
			<FooterHoursBlock />
		</footer>
	);
}
