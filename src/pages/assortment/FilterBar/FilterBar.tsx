import { ChangeEvent, SetStateAction } from 'react';
import { ISortAndFilterParameters } from '@/pages/types/sortAndFilterParameters';
import styles from './FilterBar.module.scss';

interface Props {
	setParameters: React.Dispatch<SetStateAction<ISortAndFilterParameters>>;
}

export default function FilterBar({ setParameters }: Props) {
	const handleSortSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		setParameters((prevValue) => {
			return { sort: event.target.value, filter: prevValue?.filter };
		});
	};

	const handleFilterSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		setParameters((prevValue) => {
			return { sort: prevValue?.sort, filter: event.target.value };
		});
	};

	return (
		<div id={styles['filter-bar-wrapper']}>
			<div id={styles['select-boxes-wrapper']}>
				<div id={styles['select-box']}>
					<p>Sort products by: </p>
					<select onChange={handleSortSelectChange}>
						<option value="">Sort by</option>
						<option value="aFirst">From A to Z</option>
						<option value="zFirst">From Z to A</option>
						<option value="cheapFirst">Cheap first</option>
						<option value="expensiveFirst">Expensive first</option>
					</select>
				</div>
				<div id={styles['select-box']}>
					<p>Filter products by: </p>
					<select onChange={handleFilterSelectChange}>
						<option value="">Filter by</option>
						<option value="cheaperThan1000">Cheaper than 1000$</option>
						<option value="moreExpensiveThan1000">
							More expensive than 1000$
						</option>
						<option value="cheaperThan5000">Cheaper than 5000$</option>
						<option value="moreExpensiveThan5000">
							More expensive than 5000$
						</option>
					</select>
				</div>
			</div>
		</div>
	);
}
