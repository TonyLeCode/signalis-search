import { Generated, Insertable, Selectable } from 'kysely';

export interface Database {
	entry: EntryTable;
	place: PlaceTable;
	text: TextTable;
}

export interface EntryTable {
	id: Generated<number>;
	title: string;
	part: string;
	slug: string;
}

export interface PlaceTable {
	id: Generated<number>;
	place: string;
	entryid: number;
}
export interface TextTable {
	id: Generated<number>;
	text: string;
	entryid: number;
	page: number;
}

export type Entry = Selectable<EntryTable>;
export type NewEntry = Insertable<EntryTable>;
export type Place = Selectable<PlaceTable>;
export type NewPlace = Insertable<PlaceTable>;
export type Text = Selectable<TextTable>;
export type NewText = Insertable<TextTable>;
