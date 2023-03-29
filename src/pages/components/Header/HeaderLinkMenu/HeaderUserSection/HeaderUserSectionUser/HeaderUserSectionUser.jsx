import React, { useEffect, useState } from 'react';
import HeaderUserMenu from '../HeaderUserSectionButtons/HeaderUserMenu/HeaderUserMenu';
import './HeaderUserSectionUser.scss';

export default function HeaderUserSectionUser() {
	const [isOpenMenu, setIsOpenMenu] = useState(true);

	useEffect(() => {
		console.log('isOpenMenu', isOpenMenu);
	}, [isOpenMenu]);

	return (
		<>
			<div id="logined-user">
				{isOpenMenu && <HeaderUserMenu />}
				<button
					id="logined-user-button"
					onClick={() => setIsOpenMenu((prevValue) => !prevValue)}>
					<img src="user-circle.png" />
				</button>
			</div>
		</>
	);
}
