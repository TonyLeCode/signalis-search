import { Database } from './types';
import { createKysely } from '@vercel/postgres-kysely';
import {  sql } from 'kysely';


export async function getEntry(id: string) {
	const db = createKysely<Database>();
	try {
		const entry = await db
			.selectFrom('entry')
			.select(['entry.id', 'entry.title'])
			.innerJoin('text', 'text.entryid', 'entry.id')
			.select(() => [sql<string[]>`array_agg(text.text ORDER BY text.page)::text[]`.as('text')])
			.innerJoin('place', 'place.entryid', 'entry.id')
			.select(() => [sql<string[]>`array_agg(DISTINCT place)::text[]`.as('place')])
			.where('entry.slug', '=', id)
			.groupBy(['entry.id'])
			.executeTakeFirstOrThrow();
		return entry;
	} catch (error) {
		console.error(error);
	}
	db.destroy()
}