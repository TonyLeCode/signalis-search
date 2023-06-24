import Image from 'next/image';
import Accordion from './Accordion';
import Dialog from './Dialog';

const ch1 = {
	parts: ['Installation Aeon', "Worker's Quarters", 'Hospital', 'Protektors'],
};
const ch2 = {
	parts: ['Excavation', 'Nowhere', 'New Game'],
};

const ch1Places: { [key: string]: string[] } = {
	'Installation Aeon': [
		'Welcome to S-23 Sierpinski',
		'Service Request Form F-29',
		'Keep Records!',
		'Memorandum: Wall Safe Codes',
		'No running in the hallways!',
		'The Rule of Six',
		'Memorandum: Terminology',
		'Type-75 Pistol: User Manual',
		'Mond&Töchter High-Security Wall Safe (Numeric)',
	],
	"Worker's Quarters": [
		'Diary',
		"Alina's Diary",
		'Scrawled Note',
		'Service Request Form F-29 (2nd)',
		'Vertical Map of S-23 Sierpinski',
		'Interrogation Report',
		'Wunderwaffen',
		'Electro-Impulse Devices',
		'Search Protocol',
		'Service Request Form R-90',
		'About the Administrator',
		'REM-64 Longwave Radio Receiver Module: User Manual',
		'To Radio Officer Yeong, Station 6',
		'Frequencies',
	],
	Hospital: [
		'Patient EULR-S2321',
		"Alina's Diary (2)",
		'REPLIKA-KLStim-N Soforthile 2.0 ml Package Insert',
		'Memorandum: Wall Safe Codes',
		'SWORD',
		'Proper Disposal of Corpses',
		'Attention',
		'Resevoir Drainage Instructions',
		'Flood Drainage System Malfunction',
		'Personal Grievance Form P-14',
		'Quick-Curing Construction Foam',
	],
	Protektors: [
		'Angry Note',
		'Replika Overview: STAR',
		'Buyan',
		'Memorandum: Lighting Malfunction',
		'Replika Overview: ARAR',
		'Heimat',
		'Order No. S23-90A3C28F97',
		'Kitezh',
		'Replika Known Issues, Part 3',
		'Replika Overview: FKLR',
		"Falke's Diary",
		'Replika Overview: ADLR',
		'Replika Overview: EULR',
		'Vineta',
		'Kolibri in the Management Office',
		'Replika Known Issues, Part 2',
		'Replika Known Issues, Part 1',
		'Replika Overview: KLBR',
		"Kolibri's Note",
		'Rotfront',
		"Adler's Diary",
		'Replika Overview: LSTR',
		'Replika Overview: MNHR',
		'Replika Known Issues, Part 4',
		'Shrine Diary',
	],
};

const ch2Places: { [key: string]: string[] } = {
	Excavation: ['Monofilament Fiber', "Alina's Diary (3)", 'Blank Note', "Out of reach 'The King in Yellow'"],
	Nowhere: ['Offerings', 'Warnings', 'The Dreamer', "Alina's Diary (4)", 'Leave', "The Empress' Hand"],
	'New Game': [
		'Penrose emergency procedure appendix H',
		'Penrose briefing: Phase 2',
		'Scheduled Maintenance Checklist',
		'Operation Penrose',
		'Doodle',
		'Replika Known Issues, Penrose Program',
		"Ariane's Notes",
		'Message Inbox',
		"Teacher's Evaluation: Ariane Yeong",
		'Modfest celebration cancelled over safety concerns',
		'The Red Eye',
		'Reunification',
		'Bioresonance Technology and its Limitations',
		'Medical Database (Archived)',
		'Song of the Gods',
		'Dream Diary',
		"People's Army, 5th Vinetan Infantry Division, Unit 12",
		'Leaving',
		'Workforce assignment for Yeong, Ariane',
		"Auntie's Note",
		'Letter from Mother',
	],
};

const ch1Found: { [key: string]: string[] } = {
	'Installation Aeon': [
		'Surface Access',
		'Staff Room',
		'Staff Room',
		'Staff Room',
		'Class 4B',
		'Corridor',
		'Observation',
		'Observation',
		'Library',
	],
	"Worker's Quarters": [
		'A64',
		'A61',
		'A61',
		'Block A6',
		'Protektor Elevator',
		'Office',
		'Office',
		'Office',
		'Registry',
		'Pantry',
		'Rationing Office',
		'Memory Living Quarters',
		'Memory Living Quarters',
		'Interrogation',
	],
	Hospital: [
		'ICU 01',
		'ICU 01',
		'ICU 02',
		'Nurse Station',
		'Waiting Room',
		'Incinerator',
		'Incinerator',
		'Pump Room',
		'Pump Room',
		'Vent Room',
		'Exam Room',
	],
	Protektors: [
		'STCR Dorm',
		'STCR Dorm',
		'STCR Dorm',
		'Cleaning Room Hallway',
		'ARAR Dorm',
		'STAR Dorm',
		'Dining Room',
		'Dining Room',
		'FKLR Office',
		'FKLR Study',
		'FLKR Bedroom',
		'ADLR Bedroom',
		'Piano Room',
		'Protektor Archive',
		'',
		'Workshop',
		'KLBR Study',
		'KLBR Study',
		'KLBR Study',
		'Flood Overflow',
		'ADLR Study',
		'ADLR Study',
		'Library',
		'Library',
		'ADLR Study',
	],
};

const ch2Found: { [key: string]: string[] } = {
	Excavation: ['', '', '', ''],
	Nowhere: ['', '', '', '', '', ''],
	'New Game': [
		'Medical',
		'Medical',
		'Stern Hall',
		'Stern Observatory',
		'Stern Observatory',
		'Mess Hall',
		'Storage',
		'Blackwart Office',
		'Hospital Room',
		'Apartment',
		'Alley',
		'Apartment',
		'Butterfly Room',
		'Blackwart Office',
		'Backroom',
		'Meat Room',
		'Photo Store',
		'Packstation',
		'Last Save Room',
		'Last Save Room',
		'Last Save Room',
	],
};

export default function Entries() {
	return (
		<>
			<div className="fly-right-fade relative mb-2 mt-12 flex sm:mb-4 sm:mt-24">
				<h1 className="text-3xl font-semibold sm:text-4xl">Entries</h1>
				<Dialog />
			</div>
			<h2 className="fly-right-fade mb-2 text-xl font-semibold sm:text-2xl" style={{ animationDelay: '100ms' }}>
				Chapter 1: Synchronicity
			</h2>
			<ul className="w-full max-w-xl">
				{ch1.parts.map((part, i) => {
					return <Accordion key={part} part={part} places={ch1Places[part]} found={ch1Found[part]} index={i} />;
				})}
			</ul>
			<h2 className="fly-right-fade mb-2 text-xl font-semibold sm:text-2xl" style={{ animationDelay: '200ms' }}>
				Chapter 2: Liminality
			</h2>
			<ul className="w-full max-w-xl">
				{ch2.parts.map((part, i) => {
					return <Accordion key={part} part={part} places={ch2Places[part]} found={ch2Found[part]} index={i} />;
				})}
			</ul>
		</>
	);
}
