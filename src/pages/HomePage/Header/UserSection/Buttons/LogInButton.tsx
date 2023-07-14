import { useRouter } from 'next/router';

export default function LogInButton() {
	const router = useRouter();

	return (
		<div className="flex flex-row gap-3 max-sm:w-full max-sm:justify-center">
			<button
				className="bg-[#fff992] text-black text-[1.2rem] border-black border-[3px] rounded-[10px] p-2 transition-all diration-100 ease-linear hover:scale-[1.1] font-[--main-font-weight]"
				onClick={() => router.push('/login')}>
				SignUp/LogIn
			</button>
		</div>
	);
}
