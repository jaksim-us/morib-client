export const isUrlValid = (url: string) => {
	const urlPattern = /^(https?:\/\/)?([\w-]+(?:\.[\w-]+)+)(:[0-9]{1,5})?(\/[\w#!:.?+=&%@!\-/]*)?$/;
	return urlPattern.test(url);
};
