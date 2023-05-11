import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="shortcut icon" href="./icons8.png" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body className="bg-[#F6FFDE]">
				<div id="portal"></div>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
