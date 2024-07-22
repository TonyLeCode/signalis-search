import { Metadata } from 'next';
import './globals.css';
import { Raleway } from 'next/font/google';
import Breadcrumbs from './components/Breadcrumbs';

const raleway = Raleway({ weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
	metadataBase: new URL(process.env.STATIC_URL || 'http://localhost:3000'),
	title: 'Kohlibri',
	description: 'Kohlibri is a search engine for Signalis. This is a fan made website to search through memories in Signalis.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={raleway.className}>
				<div className="bg" />
				<Breadcrumbs />
				<main className="w-full m-auto flex max-w-4xl flex-col items-center px-2 overflow-x-hidden">{children}</main>
				<footer className="mt-auto w-full bg-black/50 py-3 text-center text-[.6rem] font-extralight sm:tracking-[2px] text-white/75">
					disclaimer: this website is not associated with rose-engine games
				</footer>
			</body>
		</html>
	);
}
