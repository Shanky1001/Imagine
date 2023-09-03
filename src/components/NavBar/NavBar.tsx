import React from "react";
import Link from "next/link";

const NavBar = () => {
	return (
		<header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
			<Link href="/">
				<h3 className="text-black text-xl font-bold font-inter">Imagine</h3>
			</Link> 
			<Link
				href="/createpost"
				className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
			>
				Create
			</Link>
		</header>
	);
};

export default NavBar;
