interface Props {
	handleClick: () => void;
}

export default function CloseButton({ handleClick }: Props) {
	return (
		<button
			className="absolute left-[30px] top-[1rem] text-[2.5rem] h-fit transition-all ease-linear duration-100 hover:scale-[1.2] hover:text-[darkblue] dark:text-black dark:hover:text-[orange]"
			onClick={handleClick}>
			&times;
		</button>
	);
}
