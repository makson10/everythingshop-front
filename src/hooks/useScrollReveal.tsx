const useScrollReveal = () => {
	const setUpSRAnim = async (
		componentRef: React.MutableRefObject<HTMLDivElement | null>,
		duration: number,
		distance: string = '0px'
	) => {
		if (!componentRef.current) return;

		const sr = (await import('scrollreveal')).default;
		sr().reveal(componentRef.current, {
			duration: duration,
			distance: distance,
		});
	};

	return setUpSRAnim;
};

export default useScrollReveal;
