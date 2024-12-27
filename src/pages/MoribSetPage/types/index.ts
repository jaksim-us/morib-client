export interface AllowedService {
	id: number;
	allowedServiceName: string;
	selectedColor: string;
	urlList: UrlInfo[];
}

export interface UrlInfo {
	siteName: string;
	page: string;
	url: string;
	faviconUrl: string;
}
