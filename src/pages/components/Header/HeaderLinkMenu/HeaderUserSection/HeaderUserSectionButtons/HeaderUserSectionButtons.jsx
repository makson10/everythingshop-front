import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderUserSectionButtons.scss';

export default function HeaderUserSectionButtons() {
    const navigate = useNavigate();

	return (
		<div id="header-button-wrapper">
			<button id="header-log-in-button" onClick={() => navigate('/signIn')}>
				Log In
			</button>
			<button id="header-sign-up-button" onClick={() => navigate('/signUp')}>
				Sign Up
			</button>
		</div>
	);
}
