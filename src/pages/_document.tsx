import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="shortcut icon" href="/logo.png" />
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
			<body className="bg-[#F6FFDE] dark:bg-[--four-dark-color] dark:text-white">
				<div id="portal"></div>
				<Main />
				<NextScript />
			</body>
			<script
				src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIqh7FV0obZvEf8CbSqqn3fGKhNA3L-4I&libraries=places"
				async></script>
		</Html>
	);
}
