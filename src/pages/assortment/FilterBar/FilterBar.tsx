import { ChangeEvent, SetStateAction } from 'react';
import { ISortAndFilterParameters } from '@/pages/types/sortAndFilterParameters';
import styles from './FilterBar.module.scss';
import SortSelect from './SortSelect/SortSelect';
import FilterSelect from './FilterSelect/FilterSelect';
import SearchInput from './SearchInput/SearchInput';

interface Props {
	setParameters: React.Dispatch<SetStateAction<ISortAndFilterParameters>>;
}

export default function FilterBar({ setParameters }: Props) {
	const handleSortSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		setParameters((prevValue) => {
			return {
				sort: event.target.value,
				filter: prevValue?.filter,
				search: prevValue?.search,
			};
		});
	};

	const handleFilterSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		setParameters((prevValue) => {
			return {
				sort: prevValue?.sort,
				filter: event.target.value,
				search: prevValue?.search,
			};
		});
	};

	const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setParameters((prevValue) => {
			return {
				sort: prevValue?.sort,
				filter: prevValue?.filter,
				search: event.target.value,
			};
		});
	};

	return (
		<div id={styles['filter-bar-wrapper']}>
			<div id={styles['select-boxes-wrapper']}>
				<SortSelect handleFunction={handleSortSelectChange} />
				<FilterSelect handleFunction={handleFilterSelectChange} />
			</div>
			<SearchInput handleFunction={handleSearchInputChange} />
		</div>
	);
}
