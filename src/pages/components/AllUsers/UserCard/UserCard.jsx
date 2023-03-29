import React from 'react';
import './UserCard.scss';

export default function UserCard({ className, user }) {
	return (
		<div className={className}>
			<p><b>_id:</b> {user._id || 'hui_id'}</p>
			<p><b>name:</b> {user.name || 'hui'}</p>
			<p><b>age:</b> {user.age || 73}</p>
			<p><b>email:</b> {user.email || 'hui@gmail.com'}</p>
			<p><b>login:</b> {user.login || 'login_hui'}</p>
			<p><b>password:</b> {user.password || 'password_hui'}</p>
		</div>
	);
};