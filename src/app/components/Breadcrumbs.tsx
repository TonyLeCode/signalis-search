'use client';

import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
	const path = usePathname();
	const pathnames = path.split('/');
	pathnames.splice(0, 1);

	let home = false;
	if (pathnames[pathnames.length - 1] !== '') {
		home = true;
	} else {
		pathnames.splice(pathnames.length - 1, 1);
	}

  if (pathnames.length === 0) {
    return (<></>)
  }
  const culledPathnames = pathnames.map((name) => {
		name = decodeURIComponent(name);
    if (name.length > 10) {
      return name.slice(0, 10) + '...';
    }
    return name;
  })

	return (
		<ol className="w-full m-auto flex max-w-4xl p-4 pt-4 gap-3 text-sm sm:text-base sm:pt-10" aria-label="Breadcrumb">
			{home ? (
				<li>
					<a href="/" className="text-primary-blue hover:underline hover:text-primary-blue-hover">
						Home
					</a>
				</li>
			) : null}
			{culledPathnames.map((name, index) => {
				return (
					<li key={name} className='flex flex-row'>
						<span className="mr-3 inline-block select-none font-light text-white/80" aria-hidden="true">
							&gt;
						</span>
						{index !== culledPathnames.length - 1 ? (
							<a
								href={`/${culledPathnames.slice(0, index + 1).join('/')}`}
								className="text-primary-blue capitalize hover:underline hover:text-primary-blue-hover w-fit"
							>
								{name}
							</a>
						) : (
							<span className="capitalize font-light text-white/80 underline">{name}</span>
						)}
					</li>
				);
			})}
		</ol>
	);
}
