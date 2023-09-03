import { Connect } from "@/dbconfig";
import Posts from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	try {
		await Connect();
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
		await Connect();
		const { name, prompt, photo } = await req.json();
		const newPost = await Posts.create({
			name,
			prompt,
			photo,
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
	} catch (error) {
		return NextResponse.json({ success: false, error: error });
	}
};
