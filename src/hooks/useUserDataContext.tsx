import { useContext } from 'react';
import {
	UserDataContext,
	UpdateUserDataContext,
} from '@/context/UserDataContext';

export function useUserData() {
	return useContext(UserDataContext);
}

export function useUpdateUserData() {
	return useContext(UpdateUserDataContext);
}
