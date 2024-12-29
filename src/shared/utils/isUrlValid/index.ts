export const isUrlValid = (url: string) => {
	const isUrlValid = /^(http|https?:\/\/)?([\w\-]+\.)+[a-zA-Z]{2,}(\/[\w#!:.?+=&%@!\-\/]*)?$/;
	return isUrlValid.test(url);
};
