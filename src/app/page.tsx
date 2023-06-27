import Link from 'next/link';
import { getEntry, insertEntry } from './kysely/database';

export default async function Page() {
	// const entry = {
	// 	title: 'The Red Eye',
	// 	part: '',
	// 	place: [''],
	// 	text: [
	// 		"There exists a strange, folklorish idea in many sectors of Rotfront, related to 'pareidolia', the tendency to see meaningful images in random patterns (like seeing a face in an inkblot, or letters in a smudge of dirt).\n It is well-known that the so-called 'red eye' is simply an anticyclonic storm produced by a high-pressure region in the atmosphere of Rotfront's planet.",
	// 		'Yet for some of the early settlers of Rotfront this natural phenomenon became symbolic of their struggle and way of life. That red spot in the sky became a perfect metaphor for the ever-present surveillance by the Protektors and the tight grip of the central government on Heimat. Even today, the idea of an unblinking, watchful eye observing their every move still resonates strongly with the people here.',
	// 		"During the celebration of Mondfest at the end of each Season, adult citizens will\n sometimes give students Rationmarks that have been dipped in red paint. Officially, the\n red paint is said to represent the blood of those who died in the revolution - but the red coins share an eerie resemblance to that red eye - Or is this just 'pareidolia', too?",
	// 		"Should you ever recive one of these 'red eye' Rationmarks, remember to clean off the paint with Acetone or a similar paint thinner. Spending or re-gifting paint-covered coins is considered to bring bad luck.",
	// 	],
	// 	tags: [''],
	// };
	// await insertEntry(entry)
	return (
		<>
			<h1 className="mb-2 mt-12 text-3xl font-semibold sm:mb-4 sm:mt-24 sm:text-4xl">Welcome</h1>
			<p className="mb-12 text-base sm:text-norm">
				This is an unofficial site for searching memories in{' '}
				<a className="text-primary-blue" href="https://store.steampowered.com/app/1262350/SIGNALIS/">
					Signalis
				</a>
				.
			</p>
			<Link
				href="/entries"
				className="bg-primary-orange px-8 py-1 text-base font-medium hover:bg-off-white hover:text-black sm:text-norm"
			>
				Browse Entries
			</Link>
		</>
	);
}
