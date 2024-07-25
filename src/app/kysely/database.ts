import { Database } from './types';
import { sql } from 'kysely';
import { createKysely } from '@vercel/postgres-kysely';

function connectDB() {
	return createKysely<Database>();
}

export async function getEntry(slug: string) {
	const db = connectDB();
	const entry = await db
		.selectFrom('entry')
		.select(['entry.id', 'entry.title'])
		.innerJoin('text', 'text.entryid', 'entry.id')
		.select(() => [sql<string[]>`array_agg(text.text ORDER BY text.page)::text[]`.as('text')])
		.where('entry.slug', '=', slug)
		.groupBy(['entry.id'])
		.executeTakeFirst();
	db.destroy();
	return entry;
}

export async function getAllEntrySlugs() {
	const db = connectDB();
	const slugs = await db.selectFrom('entry').select(['entry.slug']).execute();
	db.destroy();
	return slugs;
}
