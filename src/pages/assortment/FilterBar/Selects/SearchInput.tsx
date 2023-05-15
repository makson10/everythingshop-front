interface Props {
	handleFunction: (searchParameter: string) => void;
}

export default function SearchInput({ handleFunction }: Props) {
	return (
		<div className="flex flex-row items-center gap-[10px]">
			<img className="w-[32px] h-[32px]" src="./search.png" alt="#" />
			<input
				type="text"
				className="bg-transparent relative flex flex-col border-black border-b-[3px] border-t-0 border-x-0 text-[1.5rem] p-[0.2rem] pt-0 w-[260px] focus:border-blue focus:ring-0 placeholder:select-none"
				placeholder="Search"
				onChange={(e) => handleFunction(e.target.value)}
			/>
		</div>
	);
}
