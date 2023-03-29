import React, { useEffect, useState } from 'react';
import UserCard from './UserCard/UserCard';
import { useFetch } from '../../../hooks/useFetch';
import './AllUsers.scss';

export default function AllUsers() {
	const { setStartFetch, response: users, error, loading } = useFetch('http://127.0.0.1:4000/users');

    useEffect(() => {
        if (typeof users !== 'undefined') {
            setStartFetch(false);
            return;
        }
        setStartFetch(true);
    }, []);
    

	return (
		<div className="users-card-wrapper">
			{users &&
				users.map((el, index) => (
					<UserCard key={index} className="user-card" user={el} />
				))}
		</div>
	);
}
