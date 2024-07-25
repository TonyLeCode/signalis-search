import { Pool } from 'pg';
import { Kysely, PostgresDialect, sql } from 'kysely';
import { Database } from '@/app/kysely/types';

import part1 from './transcriptions/Part-1-The Penrose.json';
import part2 from './transcriptions/Part-2-Reeducation.json';
import part3 from './transcriptions/Part-3-Workers.json';
import part4 from './transcriptions/Part-4-Hospital.json';
import part5 from './transcriptions/Part-5-Protektors.json';
import part6 from './transcriptions/Part-6-Excavation.json';
import part7 from './transcriptions/Part-7-Nowhere.json';
import part8 from './transcriptions/Part-8-Memory.json';
import part9 from './transcriptions/Part-9-Rotfront.json';
import part10 from './transcriptions/Part-10-End.json';

const dialect = new PostgresDialect({
	pool: new Pool({
		host: process.env.POSTGRES_HOST,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DATABASE,
		ssl: true,
	}),
});

const db = new Kysely<Database>({
	dialect,
});

type FullEntry = {
	title: string;
	part: string;
	place: string[];
	text: string[];
};

async function insertEntry(fullEntry: FullEntry) {
	try {
		const slug = fullEntry.title.replaceAll(' ', '-');
		const { id } = await db
			.insertInto('entry')
			.values({ title: fullEntry.title, part: fullEntry.part, slug: slug })
			.returning('id')
			.executeTakeFirstOrThrow();

		fullEntry.place.forEach(async (place) => {
			await db.insertInto('place').values({ place: place, entryid: id }).executeTakeFirstOrThrow();
		});

		fullEntry.text.forEach(async (text, index) => {
			await db.insertInto('text').values({ text: text, entryid: id, page: index }).executeTakeFirstOrThrow();
		});
	} catch (error) {
		console.error(error);
	}
}

export async function seed(db: Kysely<any>): Promise<void> {
	// seed code goes here...
	// note: this function is mandatory. you must implement this function.
	part1.forEach(async (entry) => {
		await insertEntry(entry);
	});

	part2.forEach(async (entry) => {
		await insertEntry(entry);
	});

	part3.forEach(async (entry) => {
		await insertEntry(entry);
	});

	part4.forEach(async (entry) => {
		await insertEntry(entry);
	});

	part5.forEach(async (entry) => {
		await insertEntry(entry);
	});

	part6.forEach(async (entry) => {
		await insertEntry(entry);
	});

	part7.forEach(async (entry) => {
		await insertEntry(entry);
	});

	part8.forEach(async (entry) => {
		await insertEntry(entry);
	});

	part9.forEach(async (entry) => {
		await insertEntry(entry);
	});

	part10.forEach(async (entry) => {
		await insertEntry(entry);
	});

	db.destroy();
}
