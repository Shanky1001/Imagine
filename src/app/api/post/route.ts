import { Connect } from "@/dbconfig";
import Posts from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import { getImageURL } from "@/utils";

Connect();

export const GET = async (req: NextRequest) => {
	try {
		const posts = await Posts.find({});
		if (posts) {
			return NextResponse.json({ success: true, data: posts });
		} else {
			return NextResponse.json({
				success: false,
				error: "Something went wrong with database connection.",
			});
		}
	} catch (err) {
		return NextResponse.json({ success: false, error: err });
	}
};

export const POST = async (req: NextRequest) => {
	try {
		const { name, prompt, photo } = await req.json();
		const url = await getImageURL(photo);
		if (url !== "") {
			const newPost = await Posts.create({
				name,
				prompt,
				photo: url,
			});
			if (newPost) {
				return NextResponse.json({
					success: true,
					message: "Post created successfully",
					data: newPost,
				});
			} else {
				return NextResponse.json({
					success: false,
					error: "Something went wrong while saving.",
				});
			}
		} else {
			return NextResponse.json({
				success: false,
				error: "Something went wrong while generating image url.",
			});
		}
	} catch (error) {
		return NextResponse.json({ success: false, error: error });
	}
};
