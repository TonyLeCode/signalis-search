import { Database, Place, Tag, Text } from './types';
import { createKysely } from '@vercel/postgres-kysely';
import { Entry } from './types';
import { Kysely } from 'kysely';

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
		fullEntry.text.forEach(async (text) => {
			await db.insertInto('text').values({ text: text, entryid: id }).executeTakeFirstOrThrow();
		});
	} catch (error) {
		console.error(error);
	}
}

export async function getEntry() {
	try {
		const entry = await db.selectFrom('entry').selectAll().execute();
		return entry;
	} catch (error) {
		console.error(error);
	}
}
