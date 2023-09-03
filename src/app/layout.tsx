import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar/NavBar";
import Toast from "@/components/Toast/Toast";
import Analytics from "@/utils/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Imagine",
	description: "developed by Shashank Rai",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NavBar />
				<Analytics
					GA_TRACKING_ID={process.env.ANALYTICS_TRACKING_ID as string}
				/>
				<main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
					{children}
				</main>
				<Toast />
			</body>
		</html>
	);
}
