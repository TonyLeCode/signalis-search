const algoliasearch = require('algoliasearch');
require('dotenv').config();

const part1 = require('../src/lib/transcriptions/Part-1-The Penrose.json');
const part2 = require('../src/lib/transcriptions/Part-2-Reeducation.json');
const part3 = require('../src/lib/transcriptions/Part-3-Workers.json');
const part4 = require('../src/lib/transcriptions/Part-4-Hospital.json');
const part5 = require('../src/lib/transcriptions/Part-5-Protektors.json');
const part6 = require('../src/lib/transcriptions/Part-6-Excavation.json');
const part7 = require('../src/lib/transcriptions/Part-7-Nowhere.json');
const part8 = require('../src/lib/transcriptions/Part-8-Memory.json');
const part9 = require('../src/lib/transcriptions/Part-9-Rotfront.json');
const part10 = require('../src/lib/transcriptions/Part-10-End.json');

function getAllEntries() {
	const transcriptions = [part1, part2, part3, part4, part5, part6, part7, part8, part9, part10];
	return transcriptions.flat();
}

/**
 * @param {string} text
 * @returns string
 */
function removeSymbols(text) {
	const rules = [
		{
			pattern: /#/gm,
			replacement: '',
		},
		{
			pattern: /\$/gm,
			replacement: '',
		},
		{
			pattern: /@/gm,
			replacement: '',
		},
		{
			pattern: /\*/gm, // Undecipherable
			//TODO parse in search results
			// replacement: '<span class="entry-undecipherable"></span>',
			replacement: '',
		},
	];

	let formattedText = text;
	rules.forEach((rule) => {
		formattedText = formattedText.replace(rule.pattern, rule.replacement);
	});

	return formattedText;
}

console.log('Replacing Algolia objects...');

const APP_ID = process.env.ALGOLIA_APP_ID;
const ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY;

if (!APP_ID || !ADMIN_API_KEY) {
	throw new Error('API keys not found');
}

const client = algoliasearch(APP_ID, ADMIN_API_KEY);

const entries = getAllEntries().map((entry) => {
	return {
		...entry,
		text: entry.text.map((text) => {
			return removeSymbols(text);
		}),
	};
});

client
	.initIndex('signalis')
	.replaceAllObjects(entries, { safe: true, autoGenerateObjectIDIfNotExist: true })
	.then(() => {
		console.log('Replacement Success');
	})
	.catch((err) => {
		console.log(err);
	});
	;
