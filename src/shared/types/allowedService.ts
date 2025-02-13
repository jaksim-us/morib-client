import { COLOR_PALETTE_MAP } from '../constants/colorPalette';
import {
	GetAllowedServiceGroupDetailRes,
	GetAllowedServiceListRes,
	GetRecommendedSitesRes,
} from './api/allowedService';

export type ColorPaletteType = keyof typeof COLOR_PALETTE_MAP;

export type AllowedServiceGroupType = GetAllowedServiceListRes['data'][number];

export type AllowedServiceGroupDetailType = GetAllowedServiceGroupDetailRes['data'];

export type AllowedServiceGroupDetailSiteType = AllowedServiceGroupDetailType['allowedSites'][number];

export type RecommendSiteType = GetRecommendedSitesRes['data']['recommendSites'][number];
