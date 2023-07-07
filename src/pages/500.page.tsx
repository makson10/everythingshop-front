import Link from 'next/link';

export default function Custom500() {
	return (
		<main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-base font-semibold text-indigo-600 dark:text-[orange]">
					500
				</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
					Internal Server Error
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
					It looks like the server got offended and stopped working
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Link
						href="/"
						className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-orange-600 dark:focus-visible:outline-orange-600">
						Go to home page
					</Link>
					<Link
						href="/feedback"
						className="text-sm font-semibold text-gray-900 dark:text-white">
						Leave feedback <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</div>
		</main>
	);
}
