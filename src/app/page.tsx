export default function Home() {
	return (
		<>
			<h1 className="text-4xl mt-24 mb-4 font-semibold">Welcome</h1>
			<p className="mb-12">This is an unofficial site for searching in-game entries.</p>
			<div className="grid grid-cols-2 gap-4">
				<a href="/entries" className="bg-primary-red hover:bg-off-white text-black font-medium px-8 py-1">
					Browse Entries
				</a>
				<a
					href="/search"
					className="bg-off-white hover:bg-primary-orange hover:text-white font-medium text-black px-8 py-1"
				>
					Search Entries
				</a>
			</div>
		</>
	);
}
