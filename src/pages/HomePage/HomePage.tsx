import Header from './Header/Header';
import HomePageBg from './HomePageBg';
import TopSection from './TopSection/TopSection';
import ChooseInfoSection from './ChooseInfoSection/ChooseInfoSection';
import OurExperienceBlock from './OurExperienceBlock/OurExperienceBlock';
import ReviewBlock from './ReviewBlock/ReviewBlock';
import Footer from './Footer/Footer';

export default function HomePage() {
	return (
		<HomePageBg>
			<Header />
			<TopSection />
			<ChooseInfoSection />
			<OurExperienceBlock />
			<ReviewBlock />
			<Footer />
		</HomePageBg>
	);
}
