import Header from '@/pages/components/Header/Header';
import { Content } from './Content/Content';

export default function index() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				height: '100vh',
			}}>
			<Header pageName={'Card'} showCartIcon={false} />
			<Content />
		</div>
	);
}
