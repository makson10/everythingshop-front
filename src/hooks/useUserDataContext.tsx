import { useContext } from 'react';
import {
	UserDataContext,
	UserDataUpdateContext,
} from '@/context/UserDataContext';

export function useUserData() {
	return useContext(UserDataContext);
}

export function useUserDataUpdate() {
	return useContext(UserDataUpdateContext);
}
