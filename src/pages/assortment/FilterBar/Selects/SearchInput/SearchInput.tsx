import styles from './SearchInput.module.css';

interface Props {
	handleFunction: (searchParameter: string) => void;
}

export default function SearchInput({ handleFunction }: Props) {
	return (
		<div id={styles['search-wrapper']}>
			<img src="./search.png" alt="#" />
			<input
				type="text"
				id={styles['search-box']}
				placeholder="Search"
				onChange={(e) => handleFunction(e.target.value)}
			/>
		</div>
	);
}
