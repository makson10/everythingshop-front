import Link from 'next/link';

interface Props {
	title: string;
	urlToRedirect: string;
}

export default function Inscription({ title, urlToRedirect }: Props) {
	return (
		<Link
			href={urlToRedirect}
			className="font-[600] text-black dark:text-white relative inline-flex before:absolute before:top-full before:bg-[darkblue] dark:before:bg-[orange] before:w-full before:h-[4px] before:scale-x-0 before:ease-linear before:duration-100 before:transition-[transform] hover:before:scale-x-100">
			{title}
		</Link>
	);
}
