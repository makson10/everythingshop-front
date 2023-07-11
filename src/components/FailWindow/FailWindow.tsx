interface Props {
	failMessage: string;
}

export function FailWindow({ failMessage }: Props) {
	return (
		<div className="flex-[2_1_auto] flex justify-center items-center max-sm:px-8">
			<div className="bg-[gray] rounded-[1rem] p-[0.7rem]">
				<p className="text-white text-center text-[1.8rem] font-bold">{failMessage}</p>
			</div>
		</div>
	);
}
