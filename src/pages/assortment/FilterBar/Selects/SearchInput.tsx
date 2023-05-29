import { useIsDarkTheme } from '@/hooks/useIsDarkTheme';

interface Props {
	handleFunction: (searchParameter: string) => void;
}

export default function SearchInput({ handleFunction }: Props) {
	const isDarkTheme = useIsDarkTheme();

	return (
		<div className="flex flex-row items-center gap-[10px]">
			<img
				width="32"
				height="32"
				src={`https://img.icons8.com/ios-glyphs/32/${
					isDarkTheme ? 'ffffff' : '000000'
				}/search--v1.png`}
				alt="#"
			/>
			<input
				type="text"
				className="bg-transparent relative flex flex-col border-black border-b-[3px] border-t-0 border-x-0 text-[1.5rem] p-[0.2rem] pt-0 w-[260px] dark:border-white focus:border-[orange] focus:ring-0 placeholder:select-none"
				placeholder="Search"
				onChange={(e) => handleFunction(e.target.value)}
			/>
		</div>
	);
}
