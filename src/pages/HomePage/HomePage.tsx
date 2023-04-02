import { lazy } from 'react';
const Header = lazy(() => import('./Header/Header'));
const HomePageBg = lazy(() => import('./HomePageBg'));
const TopSection = lazy(() => import('./TopSection/TopSection'));
const ChooseInfoSection = lazy(
	() => import('./ChooseInfoSection/ChooseInfoSection')
);
const OurExperienceBlock = lazy(
	() => import('./OurExperienceBlock/OurExperienceBlock')
);
const ReviewBlock = lazy(() => import('./ReviewBlock/ReviewBlock'));
const Footer = lazy(() => import('./Footer/Footer'));

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
