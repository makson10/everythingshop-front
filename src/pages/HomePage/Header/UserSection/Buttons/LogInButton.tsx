import { useRouter } from 'next/router';

export default function LogInButton() {
	const router = useRouter();

	return (
		<div className="flex flex-row justify-end gap-3 w-[15%] max-sm:w-full max-sm:justify-center">
			<button
				className="bg-[#0c96ff] text-black text-[1.2rem] border-black border-[3px] rounded-[10px] p-2 px-4 font-[--main-font-weight] dark:border-white dark:text-white"
				id="go-to-login-button"
				onClick={() => router.push('/login')}>
				Log in
			</button>
		</div>
	);
}
