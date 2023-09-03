import { surpriseMePrompts } from "@/constants";
import FileSaver from "file-saver";

export const downloadImage = (_id: string, photo: any) => {
	FileSaver.saveAs(photo, `download-${_id}.jpg`);
};

export const getRandomPrompt = (prompt: string): string => {
	const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
	const randomPrompt = surpriseMePrompts[randomIndex];

	if (randomPrompt === prompt) return getRandomPrompt(prompt);

	return randomPrompt;
};
