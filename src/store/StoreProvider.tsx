import { useRef } from 'react';
import { AppStore, makeStore } from './store';
import { Provider } from 'react-redux';
import { getAndStoreUserData } from './user/userAsyncThunk';

interface Props {
	children: React.ReactNode;
}

const StoreProvider = ({ children }: Props) => {
	const storeRef = useRef<AppStore | null>(null);

	if (!storeRef.current) {
		storeRef.current = makeStore();
		storeRef.current?.dispatch(getAndStoreUserData());
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
