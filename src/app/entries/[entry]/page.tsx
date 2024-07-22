import { getEntry } from '@/app/kysely/database';
import EntryPage from './EntryPage';
import { Metadata } from 'next';
import { tokenize } from '@/app/lib/tokenize';

type Props = { params: { entry: string } };

//TODO statically rendered

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const title = decodeURIComponent(params.entry.replace(/-/gm, ' '));
	// const description = params.entry.text[0];
	// TODO add description without accessing the database twice, use cache
	return {
		title: `${title} - Kohlibri`,
		// description: description,
	};
}

export default async function Page({ params }: Props) {
	let entry;
	let attempts = 3;

	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	while (attempts--) {
		try {
			entry = await getEntry(decodeURIComponent(params.entry));
			if (entry) {
				break;
			} else {
				throw new Error('Entry not found');
			}
		} catch (error) {
			if (!attempts) {
				break;
			}
			await delay(1000);
		}
	}

	if (!entry) {
		throw new Error('Entry not found');
	}

	let formattedText: { __html: string }[] = [];
	entry.text.forEach((entry) => {
		formattedText.push({ __html: tokenize(entry) });
	});

	return (
		<>
			<h1 className="fly-right-fade entry-title relative mb-4 mt-4 w-max max-w-xs sm:max-w-xl text-center text-2xl font-semibold leading-[3rem] sm:mt-20 sm:text-[2.5rem]">
				{entry.title}
			</h1>
			<EntryPage text={formattedText} />
		</>
	);
}
