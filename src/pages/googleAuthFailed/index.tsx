import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

export default function GoogleAuthFailed() {
	const router = useRouter();

	return (
		<div className="flex bg-black min-h-screen justify-center items-center gap-4 flex-col">
			<p className="text-white text-center text-4xl">
				{router.query.errorMessage || 'Error'}
			</p>
			<button
				className=" p-2 text-2xl bg-white rounded-lg"
				onClick={() => router.replace('/signUp')}>
				Go Back
			</button>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {},
	};
};
