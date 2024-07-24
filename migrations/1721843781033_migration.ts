import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	// up migration code goes here...
	// note: up migrations are mandatory. you must implement this function.
	// For more info, see: https://kysely.dev/docs/migrations
	await db.schema
		.createTable('entry')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('title', 'text', (col) => col.notNull())
		.addColumn('part', 'text', (col) => col.notNull())
		.addColumn('slug', 'text', (col) => col.notNull())
		.execute();

	await db.schema
		.createTable('place')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('place', 'text', (col) => col.notNull())
		.addColumn('entryid', 'integer', (col) => col.references('entry.id').onDelete('cascade').notNull())
		.execute();

	await db.schema
		.createTable('text')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('text', 'text', (col) => col.notNull())
		.addColumn('page', 'integer', (col) => col.notNull())
		.addColumn('entryid', 'integer', (col) => col.references('entry.id').onDelete('cascade').notNull())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	// down migration code goes here...
	// note: down migrations are optional. you can safely delete this function.
	// For more info, see: https://kysely.dev/docs/migrations
	await db.schema.dropTable('place').execute();
	await db.schema.dropTable('text').execute();
	await db.schema.dropTable('entry').execute();
}
