import Link from 'next/link';
import Poem from './Poem';

export default async function Page() {
	return (
		<>
			<h1 className="mb-2 mt-12 text-3xl font-semibold sm:mb-4 sm:mt-24 sm:text-4xl">Welcome</h1>
			<p className="mb-4 text-base sm:text-norm max-w-2xl">
				This is an unofficial, fan-made site for searching memories in{' '}
				<a className="text-primary-blue" href="https://store.steampowered.com/app/1262350/SIGNALIS/">
					Signalis
				</a>
				. I hope that this will help players dig into the lore and discuss it more easily with each other.
			</p>
			<Link
				href="/entries"
				className="bg-primary-orange mb-12 px-8 py-1 text-base font-medium hover:bg-off-white hover:text-black sm:text-norm"
			>
				Browse Entries
			</Link>
			<Poem />
		</>
	);
}
