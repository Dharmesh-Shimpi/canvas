import { Inter } from 'next/font/google';
import SessionProvider from './components/sessionWrapper';
import './globals.css';
import { link } from 'fs';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Canvas',
	description: 'Canvas file uploader',
	link: [
		{
			rel: 'stylesheet',
			href:
				'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap',
		},
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap',
		},
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap',
		},
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Lobster&display=swap',
		},
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap',
		},
	],
};


export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<SessionProvider>{children}</SessionProvider>
			</body>
		</html>
	);
}
