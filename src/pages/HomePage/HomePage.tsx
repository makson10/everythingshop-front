import HomePageBg from './HomePageBg';
import Header from './Header/Header';
import Tagline from './Tagline/Tagline';
import OurAdventures from './OurAdventures/OurAdventures';
import AboutUs from './AboutUs/AboutUs';
import Review from './Review/Review';
import Footer from './Footer/Footer';

export default function HomePage() {
	return (
		<HomePageBg>
			<Header />
			<Tagline />
			<OurAdventures />
			<AboutUs />
			<Review />
			<Footer />
		</HomePageBg>
	);
}
