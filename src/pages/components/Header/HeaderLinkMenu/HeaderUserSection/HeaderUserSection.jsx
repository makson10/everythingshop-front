import React from 'react';
import { useUserData } from '../../../../../context/UserContext';
import HeaderUserSectionButtons from './HeaderUserSectionButtons/HeaderUserSectionButtons';
import HeaderUserSectionUser from './HeaderUserSectionUser/HeaderUserSectionUser';

export default function HeaderUserSection() {
	const userData = useUserData();
	const isUserLogin = !(Object.keys(userData).length === 0);

	return (
		<>
			{isUserLogin ? (
				<HeaderUserSectionUser />
			) : (
				<HeaderUserSectionButtons />
			)}
		</>
	);
}