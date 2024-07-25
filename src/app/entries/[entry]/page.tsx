import { getAllEntrySlugs, getEntry } from '@/app/kysely/database';
import EntryPage from './EntryPage';
import { Metadata } from 'next';
import { tokenize } from '@/app/lib/tokenize';
import { notFound } from 'next/navigation';

type Props = { params: { entry: string } };

export const dynamic = 'force-static';

export async function generateStaticParams() {
	const slugs = await getAllEntrySlugs();
	return slugs.map((slug) => ({ entry: slug.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const title = decodeURIComponent(params.entry.replace(/-/gm, ' '));
	// const description = params.entry.text[0];
	return {
		title: `${title} - Kohlibri`,
		// description: description,
	};
}

export default async function Page({ params }: Props) {
	const entry = await getEntry(decodeURIComponent(params.entry));

	if (!entry) notFound();

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
