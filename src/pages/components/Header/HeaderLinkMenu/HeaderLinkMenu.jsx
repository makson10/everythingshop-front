import React from 'react';
import { Link } from 'react-router-dom';
import HeaderUserSection from './HeaderUserSection/HeaderUserSection';
import './HeaderLinkMenu.scss';

export default function HeaderLinkMenu() {
	return (
		<div id="header-menu">
			<div id="header-link-menu">
				<ul id="header-link-ul">
					<li>
						<Link to="/allUsers">Все пользователи</Link>
					</li>
					<li>
						<Link to="/shop">Товары</Link>
					</li>
				</ul>
			</div>
			<div id="header-sign-button-wrapper">
				<HeaderUserSection />
			</div>
		</div>
	);
}
