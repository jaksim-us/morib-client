import { FieldType } from '../fileds';

export interface PostInterestAreaReq {
	serviceList: { siteName: string; siteUrl: string }[];
	interestArea: FieldType;
}

export interface PostInterestAreaRes {
	status: number;
	message: string;
}
