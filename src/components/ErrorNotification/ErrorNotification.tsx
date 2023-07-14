import { useEffect, useState } from 'react';

interface Props {
	error: string | string[];
}

export default function ErrorNotification({ error }: Props) {
	const [show, setShow] = useState<boolean | null>(null);

	useEffect(() => {
		setShow(true);
		setTimeout(() => setShow(null), 2000);
	}, []);

	return (
		<div
			className={`z-50 fixed top-[15%] right-0 bg-red-500 text-white w-fit font-semibold py-2 px-4 rounded-md shadow-md transition-all ${
				show ? 'translate-x-[0%]' : 'translate-x-[100%]'
			}`}>
			<div className="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 mr-2"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M5 13l4 4L19 7"></path>
				</svg>
				<span className="text-lg">Error!</span>
			</div>
			{typeof error === 'string' && error}
			{Array.isArray(error) &&
				error.map((error, index) => {
					return (
						<p className="mt-2 text-center" key={index}>
							{error}
						</p>
					);
				})}
		</div>
	);
}
