import { getEntry } from '@/app/kysely/database';
import { createKysely } from '@vercel/postgres-kysely';
import EntryPage from './EntryPage';

export default async function Entry({ params }: { params: { entry: string } }) {
  // const title = decodeURI(params.entry)
  const title = params.entry.replaceAll('-', ' ')
  const entry = await getEntry(title)
  if (!entry){
    throw new Error('Entry not found')
  }
	return (
		<>
			<h1 className="entry-title relative text-[2.5rem] mt-40 mb-4 font-semibold">{entry.title}</h1>
			<EntryPage text={entry.text} />
		</>
	);
}
