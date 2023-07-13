import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link
					rel="shortcut icon"
					href="https://img.icons8.com/ios/50/ffffff/shopping-cart--v1.png"
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body className="bg-[--first-color] dark:bg-[--first-dark-color] dark:text-white">
				<div id="portal" className="z-50 absolute"></div>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
