import '@/styles/variables.scss';
import '@/styles/index.scss';
import '@/styles/globals.scss';
import 'swiper/css/bundle';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import StoreProvider from '@/store/StoreProvider';
import ThemeProvider from '@/store/theme/ThemeProvider';
import CartProvider from '@/store/cart/CartProvider';

// TODO:
//? deploy to hosting, make refactoring
//? return pretty custom error in /assortment and /addproduct, /cart

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Everything Shop</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<StoreProvider>
				<ThemeProvider>
					<CartProvider>
						<Component {...pageProps} />
					</CartProvider>
				</ThemeProvider>
			</StoreProvider>
		</>
	);
}
