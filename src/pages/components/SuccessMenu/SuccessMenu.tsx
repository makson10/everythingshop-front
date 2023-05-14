import { LegacyRef, useEffect, useRef, useState } from 'react';

interface Props {
	successText: string;
}

export default function SuccessMenu({ successText }: Props) {
	const menuRef = useRef<HTMLDivElement>();
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(true);
		setTimeout(() => setShow(false), 2000);
	}, []);

	return (
		<div
			className="bg-white z-100 break-word w-[250px] fixed top-1/4 right-[0px] border-[2px] rounded-l-2xl border-black p-[0.6rem] pr-4 flex flex-col justify-between items-center"
			ref={menuRef as LegacyRef<HTMLDivElement>}>
			<p className="text-center font-sans text-[1.2rem]">{successText}</p>
		</div>
	);
}
