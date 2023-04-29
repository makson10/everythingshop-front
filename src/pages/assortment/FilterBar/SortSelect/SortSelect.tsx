import { ChangeEvent } from 'react';
import styles from './SortSelect.module.scss';

interface Props {
	handleFunction: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function SortSelect({ handleFunction }: Props) {
	return (
		<div id={styles['select-box']}>
			<p>Sort products by: </p>
			<select onChange={handleFunction}>
				<option value="">Sort by</option>
				<option value="aFirst">From A to Z</option>
				<option value="zFirst">From Z to A</option>
				<option value="cheapFirst">Cheap first</option>
				<option value="expensiveFirst">Expensive first</option>
			</select>
		</div>
	);
}
