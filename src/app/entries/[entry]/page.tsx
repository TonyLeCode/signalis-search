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

export default async function Entry({ params }: Props) {
	const title = params.entry.replaceAll('-', ' ');
	const entry = await getEntry(title);
	if (!entry) {
		throw new Error('Entry not found');
	}
	return (
		<>
			<h1 className="entry-title relative text-[2.5rem] mt-40 mb-4 font-semibold">{entry.title}</h1>
			<EntryPage text={entry.text} />
		</>
	);
}
