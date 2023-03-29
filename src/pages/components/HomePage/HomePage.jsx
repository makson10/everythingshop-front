import { useUserDataUpdate } from '../../../context/UserContext';
import { Suspense, lazy, useEffect } from 'react';
const Header = lazy(() => import('../Header/Header'));
const HomePageBg = lazy(() => import('./HomePageBg'));
const TopSection = lazy(() => import('../TopSection/TopSection'));
const ChooseInfoSection = lazy(() => import('../ChooseInfoSection/ChooseInfoSection'));
const OurExperienceBlock = lazy(() => import('../OurExperienceBlock/OurExperienceBlock'));
const ReviewBlock = lazy(() => import('../ReviewBlock/ReviewBlock'));
const Footer = lazy(() => import('../Footer/Footer'));

export default function HomePage() {
	const userDataContextUpdate = useUserDataUpdate();

	function getLoginedUserFromLS(key) {
		return localStorage.getItem(key) || '{}';
	}

	useEffect(() => {
		const user = JSON.parse(getLoginedUserFromLS('loginedUser'));
		userDataContextUpdate(user);
	}, []);

	return (
		<Suspense fallback={<p>Loading...</p>}>
			<HomePageBg>
				<Header />
				<TopSection />
				<ChooseInfoSection />
				<OurExperienceBlock />
				<ReviewBlock />
				<Footer />
			</HomePageBg>
		</Suspense>
	);
}
