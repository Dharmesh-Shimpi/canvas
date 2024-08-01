import { Inter } from 'next/font/google';
import SessionProvider from './components/sessionWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Canvas',
	description: 'Canvas file uploader',
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
