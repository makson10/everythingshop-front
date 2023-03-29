import HeaderLinkMenu from './HeaderLinkMenu/HeaderLinkMenu';
import './Header.scss';

export default function Header() {
	return (
		<div id="header">
			<p id="header-title">
				<small>MarketPlace</small> <strong>EVERYTHING</strong>
			</p>
			<HeaderLinkMenu />
		</div>
	);
}
