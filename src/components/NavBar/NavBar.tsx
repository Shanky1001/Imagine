"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NavBar = () => {
	const pathName = usePathname();
	return (
		<header className="w-full flex justify-between items-center bg-stone-300 sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
			<Link href="/">
				<h3 className="text-black text-xl font-bold font-inter">
					Imagine AI
				</h3>
			</Link>
			{pathName !== "/community" && (
				<Link
					href="/community"
					className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
				>
					View Community 
				</Link>
			)}
		</header>
	);
};

export default NavBar;
