import { Dispatch, SetStateAction } from 'react';
import { ISortAndFilterParameters } from '@/types/sortOptionsTypes';
import SortSelect from './Selects/SortSelect';
import FilterSelect from './Selects/FilterSelect';
import SearchInput from './Selects/SearchInput';

interface Props {
	setParameters: Dispatch<SetStateAction<ISortAndFilterParameters>>;
}

export default function FilterBar({ setParameters }: Props) {
	const handleSortSelectChange = (sortParameter: string) => {
		setParameters((prevValue) => {
			return {
				sort: sortParameter,
				filter: prevValue?.filter,
				search: prevValue?.search,
			};
		});
	};

	const handleFilterSelectChange = (filterParameter: string) => {
		setParameters((prevValue) => {
			return {
				sort: prevValue?.sort,
				filter: filterParameter,
				search: prevValue?.search,
			};
		});
	};

	const handleSearchInputChange = (searchParameter: string) => {
		setParameters((prevValue) => {
			return {
				sort: prevValue?.sort,
				filter: prevValue?.filter,
				search: searchParameter,
			};
		});
	};

	return (
		<div className="flex justify-between items-center p-8 px-12 max-sm:flex-col max-sm:gap-4">
			<SortSelect handleFunction={handleSortSelectChange} />
			<FilterSelect handleFunction={handleFilterSelectChange} />
			<SearchInput handleFunction={handleSearchInputChange} />
		</div>
	);
}
