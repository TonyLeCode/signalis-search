import part1 from './Part-1-The Penrose.json';
import part2 from './Part-2-Reeducation.json';
import part3 from './Part-3-Workers.json';
import part4 from './Part-4-Hospital.json';
import part5 from './Part-5-Protektors.json';
import part6 from './Part-6-Excavation.json';
import part7 from './Part-7-Nowhere.json';
import part8 from './Part-8-Memory.json';
import part9 from './Part-9-Rotfront.json';
import part10 from './Part-10-End.json';

type Transcriptions = {
	title: string;
	slug: string;
	part: string;
	place: string[];
	text: string[];
	browseTitle?: string;
}[];

export const transcriptions: Transcriptions[] = [part1, part2, part3, part4, part5, part6, part7, part8, part9, part10];

export const memories: Transcriptions = transcriptions.flat();

export const subChapters = [
	'The Penrose',
	'Reeducation',
	'Workers',
	'Hospital',
	'Protektors',
	'Excavation',
	'Nowhere',
	'Memory',
	'Rotfront',
	'End',
];

export const chapters = ['Synchronicity', 'Liminality', 'Gestaltzerfall'];
