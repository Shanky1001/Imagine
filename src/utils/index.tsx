import { imageSizes, surpriseMePrompts } from "@/constants";
import firebase from "@/firebase";
import FileSaver from "file-saver";
import { getStorage, ref, uploadString,getDownloadURL } from "firebase/storage";

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
	return (
		imageSizes.find(
			(val: any) => val.label.toLowerCase() === size.toLowerCase()
		)?.id ?? "512x512"
	);
};

export const getImageURL = async (photo: string) => {
	let URL = "";
	let filename = Date.now().toString()+".png";
	const storage = getStorage(firebase);
	const storageRef = ref(storage, filename);
	try {
		await uploadString(storageRef, photo, "base64").then(async () => {
			await getDownloadURL(storageRef).then((downloadURL) => {
				URL = downloadURL;
			});
		}).catch((err) => {
			console.log(err);
		})
	} catch (error) {
		console.log(error)
	}
	
	return URL;
};
