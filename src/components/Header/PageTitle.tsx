interface Props {
	pageTitle: string;
}

const PageTitle = ({ pageTitle }: Props) => {
	return (
		<p className="flex items-center text-[1.8rem] max-sm:text-[1.4rem]">
			{pageTitle}
		</p>
	);
};

export default PageTitle;
