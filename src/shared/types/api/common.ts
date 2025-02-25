export interface GetUrlNameReq {
	url: string;
}

export interface GetUrlNameRes {
	status: number;
	message: string;
	data: {
		tabName: string;
	};
}

export interface PostToggleTaskStatusReq {
	taskId: number;
}
