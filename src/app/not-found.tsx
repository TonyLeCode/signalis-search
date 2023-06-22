import Link from "next/link";

export default function NotFound() {
	return (
		<>
			<h1 className="text-4xl mt-24 mb-4 font-semibold">404</h1>
			<p>Page Not Found. <Link href="/" className="text-primary-blue hover:text-off-white font-medium">
				Go home
			</Link></p>
		</>
	);
}
