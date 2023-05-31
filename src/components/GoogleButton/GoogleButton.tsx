import { useRouter } from 'next/router';
import Image from 'next/image';

interface Props {
	action: string;
	redirectUrl: string;
}

export default function GoogleButton({ action, redirectUrl }: Props) {
	const router = useRouter();

	return (
		<button
			className="px-4 py-2 border-4 flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
			onClick={() => {
				router.push(redirectUrl);
			}}>
			<Image
				className="w-6 h-6"
				src="https://www.svgrepo.com/show/475656/google-color.svg"
				alt="#"
				loading="lazy"
				width={100}
				height={100}
			/>
			<span className="dark:text-white">{action} with Google</span>
		</button>
	);
}
