import { getImageSize } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { ImageGenerateParams } from "openai/resources";
export const GET = async (req: NextRequest) => {
	return NextResponse.json({
		success: true,
		message: "Hello !! Dalle here.",
	});
};

export const POST = async (req: NextRequest) => {
	const { prompt, size } = await req.json();
	const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
	try {
		const imageSize = getImageSize(size);
		const apiResponse = await openai.images.generate({
			prompt: prompt,
			n: 1,
			size: imageSize as ImageGenerateParams["size"],
			response_format: "b64_json",
		});
		if (apiResponse.data) {
			return NextResponse.json({
				success: true,
				photo: apiResponse.data[0]?.b64_json,
			});
		} else {
			return NextResponse.json({
				success: false,
				error: "Something went wrong!!",
			});
		}
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({
			success: false,
			error: error?.error.message ?? "Something went wrong",
		});
	}
};
