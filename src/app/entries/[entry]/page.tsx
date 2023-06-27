import { getEntry } from '@/app/kysely/database';
import EntryPage from './EntryPage';
import { Metadata } from 'next';

type Props = { params: { entry: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const title = params.entry.replaceAll('-', ' ');
	return {
		title: `${title} - Signalis Search`,
	};
}

export default async function Page({ params }: Props) {
	// const title = params.entry.replaceAll('-', ' ');
	let entry;
	let attempts = 3;

	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	while (attempts--) {
		console.log('s');
		try {
			entry = await getEntry(params.entry);
			if (entry) {
				break;
			} else {
				throw new Error('Entry not found');
			}
		} catch (error) {
			if (!attempts) {
				break;
			}
			await delay(5000);
		}
	}

	if (!entry) {
		throw new Error('Entry not found');
	}
	return (
		<>
			<h1 className="fly-right-fade entry-title relative text-2xl sm:text-[2.5rem] mt-6 sm:mt-40 mb-4 font-semibold">{entry.title}</h1>
			<EntryPage text={entry.text} />
		</>
	);
}
