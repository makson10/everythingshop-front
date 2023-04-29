import { ChangeEvent } from 'react';
import styles from './FilterSelect.module.scss';

interface Props {
	handleFunction: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function FilterSelect({ handleFunction }: Props) {
	return (
		<div id={styles['select-box']}>
			<p>Filter products by: </p>
			<select onChange={handleFunction}>
				<option value="">Filter by</option>
				<option value="cheaperThan1000">Cheaper than 1000$</option>
				<option value="moreExpensiveThan1000">More expensive than 1000$</option>
				<option value="cheaperThan5000">Cheaper than 5000$</option>
				<option value="moreExpensiveThan5000">More expensive than 5000$</option>
			</select>
		</div>
	);
}
