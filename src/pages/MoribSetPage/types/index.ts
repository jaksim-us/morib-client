export interface MoribSet {
	id: number;
	moribSetName: string;
	selectedColor: string;
	urlList: UrlInfo[];
}

export interface UrlInfo {
	siteName: string;
	page: string;
	url: string;
	faviconUrl: string;
}
