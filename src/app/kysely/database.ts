import { Database, Place, Tag, Text } from './types';
import { createKysely } from '@vercel/postgres-kysely';
import { Entry } from './types';
import { Kysely, sql } from 'kysely';

const db = createKysely<Database>();

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('entry')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('title', 'text', (col) => col.notNull());
	// .addColumn('place', );
	// Migration code
}

export async function down(db: Kysely<any>): Promise<void> {
	// Migration code
}

interface fullEntry {
	title: string;
	part: string;
	place: string[];
	tags: string[];
	text: string[];
}

export async function insertEntry(fullEntry: fullEntry) {
	try {
		const { id } = await db
			.insertInto('entry')
			.values({ title: fullEntry.title, part: fullEntry.part })
			.returning('id')
			.executeTakeFirstOrThrow();

		fullEntry.place.map(async (place) => {
			await db.insertInto('place').values({ place: place, entryid: id }).executeTakeFirstOrThrow();
		});
		fullEntry.tags.forEach(async (tag) => {
			await db.insertInto('tag').values({ tag: tag, entryid: id }).executeTakeFirstOrThrow();
		});
		fullEntry.text.forEach(async (text, index) => {
			await db.insertInto('text').values({ text: text, entryid: id, page: index }).executeTakeFirstOrThrow();
		});
	} catch (error) {
		console.error(error);
	}
}

interface getEntryReturn {
	id: number;
	title: string;
	place: string[];
	tag: string[];
	text: string[];
}

export async function getEntry(id: string) {
	try {
		// const entry = await db.selectFrom('entry').selectAll().execute();
		const entry = await db
			.selectFrom('entry')
			.select(['entry.id', 'entry.title'])
			.innerJoin('text', 'text.entryid', 'entry.id')
			.select(() => [sql<string[]>`array_agg(text.text ORDER BY text.page)::text[]`.as('text')])
			.innerJoin('place', 'place.entryid', 'entry.id')
			.select(() => [sql<string[]>`array_agg(DISTINCT place)::text[]`.as('place')])
			.innerJoin('tag', 'tag.entryid', 'entry.id')
			.select(() => [sql<string[]>`array_agg(DISTINCT tag)::text[]`.as('tag')])
			.where('entry.title', '=', id)
			.groupBy(['entry.id'])
			.executeTakeFirstOrThrow();
		return entry;
	} catch (error) {
		console.error(error);
	}
}
