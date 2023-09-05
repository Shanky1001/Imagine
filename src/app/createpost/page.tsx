"use client";

import FormField from "@/components/FormField/FormField";
import { getRandomPrompt } from "@/utils";
import React, { useState } from "react";
import Image from "next/image";
import { preview } from "@/assets/images";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import { imageSizes } from "@/constants";
import DropDown from "@/components/DropDown/DropDown";
import { toast } from "react-toastify";
import { formInterface } from "@/types";

const CreatePost = () => {
	const router = useRouter();

	const [form, setForm] = useState<formInterface>({
		name: "",
		prompt: "",
		photo: "",
		size: "small",
	});

	const [generatingImg, setGeneratingImg] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (e: any) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSurpriseMe = () => {
		const randomPrompt = getRandomPrompt(form.prompt);
		setForm({ ...form, prompt: randomPrompt });
	};

	const generateImage = async () => {
		if (form.prompt) {
			try {
				setGeneratingImg(true);
				const response = await fetch("/api/dalle", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						prompt: form.prompt,
						size: form.size,
					}),
				});

				const data = await response.json();
				if (data.success) {
					setForm({
						...form,
						photo: `data:image/jpeg;base64,${data.photo}`,
					});
				} else {
					toast.error(data.error, {
						position: toast.POSITION.TOP_RIGHT,
					});
				}
			} catch (err: any) {
				toast.error(err, {
					position: toast.POSITION.TOP_RIGHT,
				});
			} finally {
				setGeneratingImg(false);
			}
		} else {
			toast.warning("Please provide proper prompt", {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (form.prompt && form.photo) {
			setLoading(true);
			try {
				const response = await fetch("/api/post", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...form,
						photo: form.photo.split(",")[1],
					}),
				});
				const result = await response.json();
				if(result.success){
					toast.success("Success", {
						position: toast.POSITION.TOP_RIGHT,
					});
					router.push("/");
				}else{
					toast.error(result.error, {
						position: toast.POSITION.TOP_RIGHT,
					});
				}
			} catch (err: any) {
				toast.error(err, {
					position: toast.POSITION.TOP_RIGHT,
				});
			} finally {
				setLoading(false);
			}
		} else {
			toast.error("Please generate an image with proper details", {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setForm({ ...form, size: e.target.value });
	};

	return (
		<section className="max-w-7xl mx-auto bg-[#f9fafe]">
			<div>
				<h1 className="font-extrabold text-[#222328] text-[32px]">
					Create
				</h1>
				<p className="mt-2 text-[#666e75] text-[14px] max-w-[700px]">
					Generate an artistic image with Imagine AI and share it with
					the community for their views.
				</p>
			</div>

			<form className="mt-12 max-w-3xl" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-5">
					<FormField
						labelName="Your Name"
						type="text"
						name="name"
						placeholder="Ex. John Doe"
						value={form.name}
						handleChange={handleChange}
					/>

					<FormField
						labelName="Prompt"
						type="text"
						name="prompt"
						placeholder="A pokemon that throw fire..."
						value={form.prompt}
						handleChange={handleChange}
						isSurpriseMe
						handleSurpriseMe={handleSurpriseMe}
					/>

					<DropDown
						label={"Select Image Size"}
						data={imageSizes}
						value={form.size}
						handleSelect={handleSelect}
					/>
					<div className="flex gap-5">
						<button
							type="button"
							onClick={generateImage}
							className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
						>
							{generatingImg ? "Generating..." : "Generate Image"}
						</button>
					</div>
				</div>
				<div className="relative mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
					{form.photo ? (
						<>
							<img
								src={form.photo}
								alt={form.prompt}
								className="w-full h-full object-contain"
								loading="lazy"
							/>
						</>
					) : (
						<>
							<Image
								src={preview}
								alt="preview"
								className="w-9/12 h-9/12 object-contain opacity-40"
							/>
						</>
					)}

					{generatingImg && (
						<div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
							<Loader />
						</div>
					)}
				</div>
				{form.photo && (
					<div className="mt-10">
						<p className="mt-2 text-[#2f3235] text-[14px]">
							** Once you have crafted the desired image, feel
							free to share it among the community for their
							appreciation. **
						</p>
						<button
							type="submit"
							className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
						>
							{loading
								? "Sharing..."
								: "Share with the Community"}
						</button>
					</div>
				)}
			</form>
		</section>
	);
};

export default CreatePost;
