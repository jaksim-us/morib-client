import { ColorPaletteType } from '../allowedService';

export interface PostStopTimerReq {
	taskId: number;
	targetDate: string;
	elapsedTime: number;
	runningCategoryName: string;
}

export interface GetTimerTodosReq {
	targetDate: string;
}

export interface GetTimerTodosRes {
	status: number;
	message: string;
	data: {
		sumTodayElapsedTime: number;
		task: {
			id: number;
			name: string;
			startDate: string;
			endDate: string;
			isComplete: boolean;
			categoryName: string;
			elapsedTime: number;
		}[];
	};
}

export interface GetTimerFriendsRes {
	status: number;
	message: string;
	data: {
		id: number;
		name: string;
		imageUrl: string;
		elapsedTime: number;
		categoryName: string | null;
		isOnline: boolean;
	}[];
}

export interface PostTimerStartReq {
	elapsedTime: number;
	runningCategoryName: string;
	taskId: number;
}

export interface GetPopoverAllowedServiceListRes {
	status: number;
	message: string;
	data: {
		id: number;
		name: string;
		colorCode: ColorPaletteType;
		selected: boolean;
		allowedSites: {
			id: number;
			siteName: string;
			siteUrl: string;
		}[];
	}[];
}

export interface PostApplyAllowedServiceGroupReq {
	allowedGroupIdList: number[];
}
