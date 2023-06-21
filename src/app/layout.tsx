import Head from 'next/head';
import './globals.css';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin'] });

export const metadata = {
	title: 'Signalis Search App',
	description: 'Search engine for memories in Signalis',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={raleway.className}>
				<div className="bg" />
				<main className="flex flex-col items-center px-4 m-auto max-w-4xl">{children}</main>
				<footer className="mt-auto text-[.6rem] bg-black/50 text-white/75 py-3 font-extralight text-center w-full tracking-[2px]">
					disclaimer: this website is not associated with rose-engine games
				</footer>
			</body>
		</html>
	);
}
