import Image from 'next/image';
import { useDarkTheme } from '@/hooks/useDarkTheme';

interface Props {
	handleSearch: (searchParameter: string) => void;
}

export default function SearchInput({ handleSearch }: Props) {
	const isDarkTheme = useDarkTheme();

	return (
		<div className="flex flex-row items-center gap-[10px]">
			<Image
				className="w-[32px] h-[32px]"
				src={`https://img.icons8.com/ios-glyphs/32/${
					isDarkTheme ? 'ffffff' : '000000'
				}/search--v1.png`}
				alt="#"
				width={100}
				height={100}
			/>
			<input
				type="text"
				className="bg-transparent relative flex flex-col border-black border-b-[3px] border-t-0 border-x-0 text-[1.5rem] p-[0.2rem] pt-0 w-[260px] dark:border-white focus:border-blue dark:focus:border-[orange] focus:ring-0 placeholder:select-none"
				placeholder="Search"
				onChange={(e) => handleSearch(e.target.value)}
			/>
		</div>
	);
}
