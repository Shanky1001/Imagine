import { imageSizes, surpriseMePrompts } from "@/constants";
import FileSaver from "file-saver";

export const downloadImage = (_id: string, photo: string) => {
	FileSaver.saveAs(photo, `download-${_id}.jpg`);
};

export const getRandomPrompt = (prompt: string): string => {
	const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
	const randomPrompt = surpriseMePrompts[randomIndex];
	if (randomPrompt === prompt) return getRandomPrompt(prompt);
	return randomPrompt;
};

export const getImageSize = (size: string): string => {
	return imageSizes.find((val:any) => val.label.toLowerCase() === size.toLowerCase())?.id ?? "512x512"
};
