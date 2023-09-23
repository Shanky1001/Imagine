"use client";
import Card from "@/components/Card/Card";
import FormField from "@/components/FormField/FormField";
import Loader from "@/components/Loader/Loader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
	const [loading, setLoading] = useState(false);
	const [allPosts, setAllPosts] = useState<any[]>([]);

	const [searchText, setSearchText] = useState("");
	const [searchedResults, setSearchedResults] = useState<any[]>([]);
	let searchTimeout: any;

	const fetchPosts = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/post", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				const result = await response.json();
				setAllPosts(result.data.reverse());
			}
		} catch (err: any) {
			toast.error(err, {
				position: toast.POSITION.TOP_RIGHT,
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const handleSearchChange = (e: any) => {
		setSearchText(e.target.value);
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			const searchResult: any[] = allPosts.filter(
				(item: any) =>
					item.name
						.toLowerCase()
						.includes(searchText.toLowerCase()) ||
					item.prompt.toLowerCase().includes(searchText.toLowerCase())
			);
			setSearchedResults(searchResult);
		}, 500);
	};

	return (
		<section className="max-w-7xl mx-auto">
			<div>
				<h1 className="font-extrabold text-[#222328] text-[32px]">
					The Community Showcase
				</h1>
				<p className="mt-2 text-[#666e75] text-[16px]">
					Delve into a captivating compilation of imaginative and
					visually stunning images crafted by the DALL-E AI.
				</p>
			</div>

			<div className="mt-16">
				<FormField
					labelName="Search posts"
					type="text"
					name="text"
					placeholder="Search something..."
					value={searchText}
					handleChange={handleSearchChange}
				/>
			</div>

			<div className="mt-10">
				{loading ? (
					<div className="flex justify-center items-center">
						<Loader />
					</div>
				) : (
					<>
						{searchText && (
							<h2 className="font-medium text-[#666e75] text-xl mb-3">
								Showing Results for{" "}
								<span className="text-[#222328]">
									{searchText}
								</span>
								:
							</h2>
						)}
						{searchText ? (
							searchedResults.length === 0 ? (
								<h2 className="mt-5 w-full text-center font-bold text-[#6469ff] text-xl uppercase">
									No Search Results Found
								</h2>
							) : (
								<div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
									<RenderCards data={searchedResults} />
								</div>
							)
						) : allPosts?.length === 0 ? (
							<h2 className="mt-5 w-full text-center font-bold text-[#6469ff] text-xl uppercase">
								No Posts Yet
							</h2>
						) : (
							<div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
								<RenderCards
									data={allPosts}
									title="No Posts Yet"
								/>
							</div>
						)}
					</>
				)}
			</div>
		</section>
	);
}

const RenderCards = ({ data }: any) => {
	return data.map((post: any) => <Card key={post._id} {...post} />);
};
