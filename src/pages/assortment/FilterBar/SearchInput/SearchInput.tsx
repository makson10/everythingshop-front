import { ChangeEvent } from 'react';
import styles from './SearchInput.module.scss';

interface Props {
	handleFunction: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({ handleFunction }: Props) {
	return (
		<div id={styles['search-wrapper']}>
			<img src="./search.png" alt="#" />
			<input
				type="text"
				id={styles['search-box']}
				placeholder="Search"
				onChange={handleFunction}
			/>
		</div>
	);
}
