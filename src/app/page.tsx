import Poem from './Poem';

export default async function Page() {
	return (
		<>
			<h1 className="fly-right-fade mb-2 mt-6 text-3xl font-semibold sm:mb-4 sm:mt-24 sm:text-4xl">Welcome</h1>
			<p className="fly-right-fade mb-4 text-base sm:text-norm max-w-2xl" style={{ animationDelay: '50ms' }}>
				This is an unofficial, fan-made site for searching memories in{' '}
				<a className="text-primary-blue hover:underline hover:text-primary-blue-hover" href="https://store.steampowered.com/app/1262350/SIGNALIS/">
					Signalis
				</a>
				. I hope that this will help players dig into the lore and discuss it more easily with each other.
			</p>
			<a
				href="/entries" style={{ animationDelay: '100ms' }}
				className="fly-right-fade bg-primary-orange mb-12 px-4 py-1 text-center text-base font-medium hover:bg-off-white hover:text-black sm:text-norm sm:px-8 sm:py-2"
			>
				Browse Entries
			</a>
			<Poem />
		</>
	);
}
