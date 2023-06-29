import Head from 'next/head';
import './globals.css';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin'] });

export const metadata = {
	title: 'Kohlibri',
	description: 'Search engine for memories in Signalis',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={raleway.className}>
				<div className="bg" />
				<main className="m-auto flex max-w-4xl flex-col items-center px-2 overflow-x-hidden">{children}</main>
				<footer className="mt-auto w-full bg-black/50 py-3 text-center text-[.6rem] font-extralight sm:tracking-[2px] text-white/75">
					disclaimer: this website is not associated with rose-engine games
				</footer>
			</body>
		</html>
	);
}
